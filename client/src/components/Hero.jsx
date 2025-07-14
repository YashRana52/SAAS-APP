import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center items-center text-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen transition-colors duration-300 dark:bg-[url(/gradientBackgroundDark.png)] dark:bg-black">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-tight text-black dark:text-white">
  Turn your ideas into reality <br />
  using <span className="text-primary dark:text-purple-400">intelligent AI tools</span>
</h1>

       <p className="text-base sm:text-lg md:text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
  Unlock the power of AI to streamline your content creation — write, edit, and publish in a fraction of the time.
</p>

      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate('/ai')}
          className="px-6 py-3 bg-primary text-white rounded-full text-sm sm:text-base hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Start creating now
        </button>

        <button
          className="px-6 py-3 border border-primary text-primary rounded-full text-sm sm:text-base hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Watch demo
        </button>
      </div>

      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mt-8">
        <img src={assets.user_group} alt="" className="h-8 invert dark:invert-0" />
        Trusted by 20k+ users
      </div>
    </div>
  );
}

export default Hero;
