import { FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function ReviewResume() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', input)

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
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
    <div className="h-full overflow-y-scroll text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0f172a]">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* left col */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#00DA83]" />
            <h1 className="text-xl font-semibold">Resume Review</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Upload Resume</p>
          <input
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            type="file"
            required
            accept="application/pdf"
            onChange={(e) => setInput(e.target.files[0])}
          />
          <p className="text-xs text-gray-500 dark:text-slate-400 font-light mt-1">
            Supported format: PDF. Max size 5MB.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 rounded-lg text-sm cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5" />
            )}
            Review Resume
          </button>
        </form>

        {/* right col */}
        <div className="w-full max-w-lg p-4 bg-white dark:bg-slate-800 rounded-lg flex flex-col border border-gray-200 dark:border-slate-700 min-h-96 max-h-[600px]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#00DA83]" />
            <h1 className="text-xl font-semibold">Analysis Resume</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-gray-500 dark:text-slate-400 text-sm flex flex-col items-center gap-5 text-center">
                <FileText className="w-9 h-9" />
                <p>
                  Upload a resume to get a detailed analysis. Supported format:
                  PDF.
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

export default ReviewResume
