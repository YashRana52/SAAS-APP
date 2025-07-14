import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

function AiTools() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="px-4 sm:px-20 xl:px-32 transition-colors duration-300 bg-white dark:bg-[#0f172a] py-10">
      <div className="text-center mb-12">
        <h2 className="text-[32px] sm:text-[42px] font-bold text-slate-700 dark:text-white leading-snug">
          Powerful AI Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-3 text-base sm:text-lg">
          Everything you need to create, enhance, and manage your content with the help of AI.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 w-full sm:max-w-sm md:max-w-md lg:max-w-xs bg-[#FDFDFE] dark:bg-[#1e1e2e] rounded-2xl shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 hover:-translate-y-2 transform transition-all duration-300 cursor-pointer"
            onClick={() => {
              if (user) {
                navigate(tool.path);
              } else {
                openSignIn();
              }
            }}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl mb-4"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiTools;
