import React, { useState } from 'react'
import Markdown from 'react-markdown'

function CreationItem({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-5 max-w-5xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300 space-y-3"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100 mb-1">
            {item.prompt}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.type} ·{' '}
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            item.type === 'image'
              ? 'bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-white'
              : 'bg-gradient-to-r from-[#C084FC] to-[#9333EA] text-white'
          }`}
        >
          {item.type.toUpperCase()}
        </span>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
          {item.type === 'image' ? (
            <div className="flex justify-center">
              <img
                src={item.content}
                alt="Generated"
                className="rounded-lg shadow-sm w-full max-w-md object-cover"
              />
            </div>
          ) : (
            <div className="reset-tw prose prose-sm dark:prose-invert max-w-none">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
