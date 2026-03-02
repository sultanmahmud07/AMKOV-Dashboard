import React from 'react';

interface CommonBannerProps {
  title: string;
  description?: string;
  image?: string; // Optional: If not provided, it falls back to gradient
}

const CommonBanner: React.FC<CommonBannerProps> = ({ 
  title, 
  description, 
  image 
}) => {
  return (
    <div className="relative mt-20 w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* === 1. Background Layer === */}
      {image ? (
        <>
          {/* Background Image with Zoom Effect */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* Dark Overlay (Essential for text readability over images) */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </>
      ) : (
        // Fallback: Your Brand Gradient
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
      )}

      {/* === 2. Content Layer === */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white capitalize mb-4 tracking-tight drop-shadow-lg animate-fadeInUp">
          {title || "Page Title"}
        </h1>

        {/* Optional Description */}
        {description && (
          <p className="text-gray-200 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {description}
          </p>
        )}

        {/* Optional: Decorative line under text */}
        <div className="w-20 h-1 bg-[#FA4318] mx-auto mt-6 rounded-full"></div>
      </div>

    </div>
  );
};

export default CommonBanner;