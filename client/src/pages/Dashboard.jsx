import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function Dashboard() {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDataboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDataboardData()
  }, [])

  return (
    <div className="h-full overflow-y-scroll p-6 bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-200">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Plan Status */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300">Plan Status</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4 text-slate-600 dark:text-slate-300">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
