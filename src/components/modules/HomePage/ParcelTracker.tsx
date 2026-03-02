import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Package, Search, ArrowRight } from 'lucide-react';

const ParcelTracker = () => {
  const [trackId, setTrackId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) {
      navigate(`/track?trackId=${trackId}`);
    }
  };

  return (
    // Added dark:bg-gray-800 for the card background
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-2 md:gap-6 animate-fadeInUp transition-colors duration-300">
      
      {/* Title Section */}
      {/* Added dark:border-gray-700 for the separator line */}
      <div className="flex-shrink-0 flex items-center gap-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 pb-4 md:pb-0 md:pr-6">
        <div className="w-12 h-12 rounded-full bg-[#FA4318]/10 flex items-center justify-center text-[#FA4318]">
          <Package size={24} />
        </div>
        <div>
          {/* Added dark:text-white */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">
            Track Your Parcel
          </h3>
          {/* Added dark:text-gray-400 */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your ID to track instantly
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleTrack} className="flex-1 w-full relative flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="Enter your Tracking ID (e.g. TRK-123456)"
            // Added dark:bg-gray-950, dark:border-gray-700, dark:text-white
            className="w-full pl-11 pr-32 md:pr-40 py-2 md:py-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-[#FA4318] focus:border-transparent outline-none transition-all placeholder:text-gray-500 dark:placeholder:text-gray-500"
          />
          
          {/* Button inside the input */}
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FA4318] hover:bg-orange-700 text-white font-bold py-2 px-4 md:px-6 rounded-md transition-all flex items-center gap-2 text-sm uppercase tracking-wide shadow-md"
          >
            Track <span className="hidden sm:inline">Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParcelTracker;