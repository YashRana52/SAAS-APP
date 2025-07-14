import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

function Plan() {
  return (
    <section className="py-20 px-4 sm:px-8 transition-colors duration-300 dark:bg-[#0f172a]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      <div className="mt-14 flex justify-center">
        <div className="scale-95 w-full max-w-4xl">
          <PricingTable />
        </div>
      </div>
    </section>
  );
}

export default Plan;
