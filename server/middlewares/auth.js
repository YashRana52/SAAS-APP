
import { clerkClient } from "@clerk/express";
//middleware to check user id and checked premimum plan


export const auth = async(req, res, next) => {
    try {

        const { userId,has } =  await req.auth();
        const hasPremiumPlan = await has({plan:'premium'})

        const user = await clerkClient.users.getUser(userId);
        if (!hasPremiumPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        }else{
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? 'premium' : 'free';

        next()
            
        
        
       
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
        
    }

}