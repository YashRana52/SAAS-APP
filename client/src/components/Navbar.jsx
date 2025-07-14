import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';



function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-50 w-full flex justify-between items-center  px-3 sm:px-20 xl:px-32 bg-white dark:bg-black transition-colors duration-300 shadow-md">
      <img
        onClick={() => navigate('/')}
        src={assets.logo1}
        alt="logo"
        className="w-20 h-10  sm:w-25 sm:h-25  cursor-pointer dark:invert"
      />

      {user ? (
        <UserButton />
      ) : (
        <button 
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:scale-105 transition-transform duration-300"
        >
          Get started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
