import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function WrightArticle() {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1600+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `write an article about ${input} in ${selectedLength.text}`
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      )

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
    <div className="h-full overflow-y-scroll text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0f172a]">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* left col */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#4A7AFF]" />
            <h1 className="text-xl font-semibold">Article Configuration</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Article Topic</p>
          <input
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            placeholder="the future of artificial intelligence is..."
            type="text"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <p className="mt-6 text-sm font-medium">Article Length</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
                  selectedLength.text === item.text
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-300 dark:border-blue-600'
                    : 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-slate-600'
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 rounded-lg text-sm cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5" />
            )}
            Generate Article
          </button>
        </form>

        {/* right col */}
        <div className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg flex flex-col border border-gray-200 dark:border-slate-700 min-h-96 max-h-[600px]">
          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-[#4A7AFF]" />
            <h1 className="text-xl font-semibold">Generated Article</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-gray-500 dark:text-slate-400 text-sm flex flex-col items-center gap-5 text-center">
                <Edit className="w-9 h-9" />
                <p>
                  Enter a topic and select the length of the article you want to
                  generate.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600 dark:text-slate-300">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WrightArticle
