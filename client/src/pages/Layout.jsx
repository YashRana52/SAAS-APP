import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useUser, SignIn } from '@clerk/clerk-react'

function Layout() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [sideBar, setSideBar] = useState(false)

  return user ? (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-200">
      <nav className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] sticky top-0 z-40">
        <img
          src={assets.logo1}
          alt="Logo"
          className="h-20 w-20 cursor-pointer dark:invert"
          onClick={() => navigate('/')}
        />
        {sideBar ? (
          <X
            onClick={() => setSideBar(false)}
            className="w-6 h-6 text-gray-500 dark:text-gray-300 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSideBar(true)}
            className="w-6 h-6 text-gray-700 dark:text-gray-300 sm:hidden"
          />
        )}
      </nav>

      <div className="flex flex-1">
        <Sidebar sidebar={sideBar} setSidebar={setSideBar} />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-[#0f172a]">
      <SignIn />
    </div>
  )
}

export default Layout
