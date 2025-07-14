import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'

import { Heart } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Community() {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
   const [loading,setLoading] = useState(true)
    const {getToken} = useAuth()
const fetchCreations = async () => {
  try {
    const { data } = await axios.get('/api/user/get-published-creations', {
      headers: { Authorization: `Bearer ${await getToken()}` }
    });

    if (data.success) {
      setCreations(data.creations);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false); 
  }
};

const imageLikeToggle = async (id) => {
  try {
    const { data } = await axios.post(
      '/api/user/toggle-like-creation',
      { id },
      {
        headers: { Authorization: `Bearer ${await getToken()}` }
      }
    );

    if (data.success) {
      toast.success(data.message);
      await fetchCreations(); 
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  fetchCreations();
}, [user]); 


  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h1 className='text-lg font-semibold text-slate-700'>Community Creations</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {creations.map((creation, index) => (
          <div
            key={index}
            className='group relative w-full overflow-hidden rounded-lg'
          >
            {/* Image */}
            <img
              src={creation.content}
              alt={creation.prompt}
              className='w-full h-auto object-cover rounded-lg'
            />

            {/* Overlay on hover — same size as image */}
            <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex flex-col justify-end p-3'>
              <p className='text-sm line-clamp-2'>{creation.prompt}</p>
              <div className='flex items-center gap-2 mt-2'>
                <p className='text-xs'>{creation.likes.length}</p>
                <Heart onClick={()=>imageLikeToggle(creation.id)}
                  className={`w-5 h-5 transition-transform duration-150 ${
                    creation.likes.includes(user?.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-white'
                  } hover:scale-110 cursor-pointer`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ):(
    <div className='flex justify-center items-center h-full '>
     <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'>

              </span>
    </div>
  )
}

export default Community
