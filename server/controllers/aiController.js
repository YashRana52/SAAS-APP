import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

//article generation
export const generateArticles = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt,length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ message: 'Free usage limit exceeded. Upgrade to premium for more requests.' });
        }

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      
        {
            role: "user",
            content: prompt,

        },

    ],
    temperature: 0.7,
    max_tokens: length,
});

const content = response.choices[0].message.content;

await sql`
  INSERT INTO creations(user_id, prompt, content, type, publish)
  VALUES (${userId}, ${prompt}, ${content}, 'article', false)
`;

if (plan !== 'premium') {
           await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata:{
                free_usage: free_usage + 1
            }
        })
    
    }
    res.json({
        success: true,
        content
    })


       


        
    } catch (error) {
        console.error('Error generating articles:', error);
        res.json({ error: 'Failed to generate articles' });
        
    }
}


//generate blogtitle
export const generateBlogTitle = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(403).json({ message: 'Free usage limit exceeded. Upgrade to premium for more requests.' });
        }

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      
        {
            role: "user",
            content: prompt,

        },

    ],
    temperature: 0.7,
    max_tokens: 100,
    
});

const content = response.choices[0].message.content;

await sql`INSERT INTO creations(user_id, prompt,content, type) VALUES (${userId}, ${prompt}, ${content},'blog-title')`;

if (plan !== 'premium') {
           await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata:{
                free_usage: free_usage + 1
            }
        })
    
    }
    res.json({
        success: true,
        content
    })


       


        
    } catch (error) {
        console.error('Error generating Blog-Title:', error);
        res.status(500).json({ error: 'Failed to Blog-Title' });
        
    }
}


//generate Image
export const generateImage = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt,publish} = req.body;
        const plan = req.plan;
        

        if (plan !== 'premium' ) {
            return res.json({ message: 'this feature is only available for premium subscription ' });
        }
    const formData = new FormData()
formData.append('prompt', prompt)
const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
    headers:{
         'x-api-key':process.env.CLIPDROP_API_KEY,
    },
    responseType: 'arraybuffer'

})

const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

const {secure_url} = await cloudinary.uploader.upload(base64Image)

await sql`INSERT INTO creations(user_id, prompt,content, type,publish) VALUES (${userId}, ${prompt}, ${secure_url},'image',${publish ?? false})`;


    res.json({
        success: true,
        content: secure_url
    })


       


        
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
        
    }
}

//remove background from the Image
export const removeImageBackground = async (req, res) => {
    try {
        const {userId} = req.auth();
        const image = req.file;
        const plan = req.plan;
        

        if (plan !== 'premium' ) {
            return res.json({ message: 'this feature is only available for premium subscription ' });
        }
   

const {secure_url} = await cloudinary.uploader.upload(image.path,{
    transformation:[
        {
            effect:'background_removal',
            background_removal: 'remove_the_background',
            
        }
    ]
})

await sql`
  INSERT INTO creations(user_id, prompt, content, type, publish)
  VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image', true)
`;


    res.json({
        success: true,
        content: secure_url
    })


       


        
    } catch (error) {
        console.error('Error remove background of image:', error);
        res.json({ error: 'Failed to remove background of image' });
        
    }
}

//remove background from the Image
export const removeImageObject = async (req, res) => {
    try {
        const {userId} = req.auth();
        const image = req.file;
        const plan = req.plan;
        const {object} = req.body;
        

        if (plan !== 'premium' ) {
            return res.json({ message: 'this feature is only available for premium subscription ' });
        }
   

const {public_id} = await cloudinary.uploader.upload(image.path)
const imageUrl =cloudinary.url(public_id,{
    transformation:[{effect:`gen_remove:${object}`,}],
    resource_type: 'image'

})


    

await sql`INSERT INTO creations(user_id, prompt,content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl},'image')`;


    res.json({
        success: true,
        content: imageUrl
    })


       


        
    } catch (error) {
        console.error('Error remove object of image:', error);
        res.status(500).json({ error: 'Failed to remove object of image' });
        
    }
}

//resume reciew
export const resumeReview = async (req, res) => {
    try {
        const {userId} = req.auth();
        const resume = req.file;
        const plan = req.plan;
        
        

        if (plan !== 'premium' ) {
            return res.json({ message: 'this feature is only available for premium subscription ' });
        }
   

if (resume.size >5 *1024 *1024) {
    return res.json({
        success:false,
        message:'Resume file size exceeds allowed size (5MB).'
    })
    
}

const dataBuffer = fs.readFileSync(resume.path)

const pdfData = await pdf(dataBuffer)

const prompt = `Review the following resume and provide constructive feedback on its strengths,weakness,and areas for improvment.Resume Content:\n\n${pdfData.text}`

const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      
        {
            role: "user",
            content: prompt,

        },

    ],
    temperature: 0.7,
    max_tokens: 1000,
});

const content = response.choices[0].message.content;




    
await sql`
  INSERT INTO creations(user_id, prompt, content, type, publish)
  VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review', false)
`;


    res.json({
        success: true,
        content
    })


       


        
    } catch (error) {
        console.error('Error in resume review:', error);
        res.json({ error: 'Failed in resume review' });
        
    }
}