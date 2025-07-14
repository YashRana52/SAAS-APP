import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function RemoveBackground() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
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
            <Sparkles className="w-6 text-[#FF4938]" />
            <h1 className="text-xl font-semibold">Background Removal</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Upload image</p>
          <input
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            type="file"
            required
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
          />
          <p className="text-xs text-gray-500 dark:text-slate-400 font-light mt-1">
            Supported formats: JPG, PNG, GIF. Max size: 5MB.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 rounded-lg text-sm cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Eraser className="w-5" />
            )}
            Remove Background
          </button>
        </form>

        {/* right col */}
        <div className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg flex flex-col border border-gray-200 dark:border-slate-700 min-h-96">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#FF4938]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-gray-500 dark:text-slate-400 text-sm flex flex-col items-center gap-5 text-center">
                <Eraser className="w-9 h-9" />
                <p>
                  Upload an image to remove its background. Supported formats
                  are JPG, PNG, and GIF.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full">
              <img
                src={content}
                alt="image"
                className="w-full h-full rounded-md object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
