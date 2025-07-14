import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import React from 'react'
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', icon: House },
  { to: '/ai/write-article', label: 'Write Article', icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', icon: Image },
  { to: '/ai/remove-background', label: 'Remove background', icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', icon: FileText },
  { to: '/ai/community', label: 'Community', icon: Users },
]

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  if (!user) return null

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={() => setSidebar(false)}
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 sm:hidden ${
          sidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`w-60 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-slate-700 flex flex-col justify-between items-center
        fixed sm:static z-40 h-full sm:h-auto sm:translate-x-0 top-0 right-0
        transition-transform duration-300 ease-in-out
        ${sidebar ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className='my-7 w-full overflow-y-auto'>
          <img
            src={user.imageUrl}
            className='w-14 h-14 rounded-full mx-auto'
            alt='User'
          />
          <h1 className='mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-100'>
            {user.fullName}
          </h1>

          <div className='mt-4 flex flex-col'>
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {React.createElement(icon, {
                      className: `w-4 h-4 ${isActive ? 'text-white' : ''}`,
                    })}
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='w-full border-t border-gray-200 dark:border-slate-700 p-4 px-7 flex items-center justify-between'>
          <div
            onClick={openUserProfile}
            className='flex gap-2 items-center cursor-pointer'
          >
            <img src={user.imageUrl} className='w-8 rounded-full' alt='' />
            <div>
              <h1 className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                {user.fullName}
              </h1>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                <Protect plan='premium' fallback='free'>
                  Premium
                </Protect>{' '}
                Plan
              </p>
            </div>
          </div>

          <LogOut
            onClick={signOut}
            className='w-4.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition cursor-pointer'
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar
