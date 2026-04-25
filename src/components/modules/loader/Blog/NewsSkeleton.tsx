import React from "react";
import { cn } from "@/lib/utils";

// Reusable Skeleton primitive matching your premium dark theme
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-zinc-800", 
      className
    )}
    {...props}
  />
);

const NewsSkeleton = () => {
  return (
    <div className="w-full p-4 md:p-6 mx-auto">
      
      {/* === Header Controls Skeleton === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Page Title */}
        <Skeleton className="h-8 w-24" /> 
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <Skeleton className="h-10 w-full sm:w-64 rounded-lg" /> 
          {/* "+ Add News" Button */}
          <Skeleton className="h-10 w-full sm:w-28 rounded-lg shrink-0" /> 
        </div>
      </div>

      {/* === News Cards Grid Skeleton === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800/60 shadow-sm h-full"
          >
            {/* Top Image Placeholder */}
            <Skeleton className="w-full aspect-[4/3] rounded-none" />

            <div className="p-5 flex flex-col flex-1">
              
              {/* Article Title (3 lines to mimic the heavy text in the image) */}
              <div className="space-y-2 mb-4 mt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[90%]" />
                <Skeleton className="h-5 w-[65%]" />
              </div>

              {/* Description Snippet (2 lines) */}
              <div className="space-y-2 mb-6">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
              </div>

              {/* Spacer pushes footer to the bottom of the card */}
              <div className="flex-1" />

              {/* Card Footer (Date & Action Icons) */}
              <div className="flex items-center justify-between pt-5 mt-auto">
                {/* Date Side */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-sm shrink-0" /> {/* Calendar Icon */}
                  <Skeleton className="h-3 w-20" /> {/* Date text */}
                </div>
                
                {/* Action Icons Side (View, Edit, Delete) */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NewsSkeleton;