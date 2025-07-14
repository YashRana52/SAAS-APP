import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function GenerateImages() {
  const ImageStyle = [
    'Realistic',
    'Cartoon Style',
    'Anime Style',
    'Fantasy Style',
    'Ghibli Style',
    '3D Style',
    'Pixel Art',
    'Portrait Style',
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
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
            <Sparkles className="w-6 text-[#22C55E]" />
            <h1 className="text-xl font-semibold">AI Image Generator</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Describe Your Image</p>
          <textarea
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            placeholder="Describe the image you want to generate..."
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />

          <p className="mt-6 text-sm font-medium">Style</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            {ImageStyle.map((item) => (
              <span
                key={item}
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition 
                ${
                  selectedStyle === item
                    ? 'bg-green-50 dark:bg-green-800 text-green-700 dark:text-green-200 border-green-300 dark:border-green-600'
                    : 'text-gray-500 dark:text-slate-400 border-gray-300 dark:border-slate-600'
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Publish toggle */}
          <div className="my-6 flex items-center gap-2">
            <label className="relative inline-block w-10 h-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
              />
              <div className="w-10 h-5 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:dark:border-slate-700 after:border after:rounded-full after:h-4 after:w-4 transition-all duration-200"></div>
            </label>
            <p>Make this image public</p>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-4 py-2 mt-6 rounded-lg text-sm cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Generate Image
          </button>
        </form>

        {/* right col */}
        <div className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg flex flex-col border border-gray-200 dark:border-slate-700 min-h-96">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-[#16A34A]" />
            <h1 className="text-xl font-semibold">Generated Image</h1>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-gray-500 dark:text-slate-400 text-sm flex flex-col items-center gap-5 text-center">
                <Image className="w-9 h-9 text-green-400" />
                <p>
                  Enter a description and style to generate a stunning AI image.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full">
              <img src={content} alt="image" className="w-full h-full rounded-md object-contain" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
