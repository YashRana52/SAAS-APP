import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function BlogTitles() {
  const blogCategories = [
    'General',
    'Technology',
    'business',
    'Health',
    'Lifestyle',
    'Travel',
    'Education',
    'Food',
  ]

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`
      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll text-slate-700 dark:text-slate-200'>

      <div className='flex flex-col lg:flex-row items-start gap-4'>
        {/* left col */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-4 bg-white dark:bg-[#1e293b] rounded-lg border border-gray-200 dark:border-slate-700'
        >
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#8E37EB]' />
            <h1 className='text-xl font-semibold'>Ai Title Generator</h1>
          </div>

          <p className='mt-6 text-sm font-medium'>Keyword</p>
          <input
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-black dark:text-white'
            placeholder='the future of artificial intelligence is...'
            type='text'
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <p className='mt-6 text-sm font-medium'>Category</p>
          <div className='mt-3 flex gap-3 flex-wrap'>
            {blogCategories.map((item) => (
              <span
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition 
                ${
                  selectedCategory === item
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500'
                    : 'text-gray-500 dark:text-gray-300 border-gray-300 dark:border-slate-600'
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 rounded-lg text-sm cursor-pointer'
          >
            {loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (
              <Hash className='w-5' />
            )}
            Generate Title
          </button>
        </form>

        {/* right col */}
        {!content ? (
          <div className='w-full max-w-lg p-4 bg-white dark:bg-[#1e293b] rounded-lg flex flex-col border border-gray-200 dark:border-slate-700 min-h-96'>
            <div className='flex items-center gap-3'>
              <Hash className='w-5 h-5 text-[#8E37EB]' />
              <h1 className='text-xl font-semibold'>Generated Title</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
              <div className='text-gray-500 dark:text-gray-400 text-sm flex flex-col items-center gap-5 text-center'>
                <Hash className='w-9 h-9' />
                <p>
                  Enter a topic and category to generate a catchy title for your blog post.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600 dark:text-slate-300'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogTitles
