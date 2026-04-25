import React from "react";
import { cn } from "@/lib/utils";

// Reusable Skeleton primitive using zinc-800 to match your premium dark theme
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-zinc-800", 
      className
    )}
    {...props}
  />
);

const AnalyticsSkeleton = () => {
  return (
    <div className="p-4 md:py-6 space-y-6 w-full  mx-auto">
      
      {/* === Page Header Skeleton === */}
      <div className="space-y-3 mb-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-md" /> {/* Title Icon */}
          <Skeleton className="h-8 w-48 lg:w-56" /> {/* Title Text */}
        </div>
        <Skeleton className="h-4 w-72 lg:w-96" /> {/* Subtitle */}
      </div>

      {/* === Alert Banner Skeleton === */}
      <div className="w-full p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10 flex items-start gap-3 shadow-sm">
        <Skeleton className="h-5 w-5 rounded-md shrink-0 bg-amber-200 dark:bg-amber-800/50" />
        <div className="space-y-2 w-full mt-0.5">
          <Skeleton className="h-4 w-32 bg-amber-200 dark:bg-amber-800/50" />
          <Skeleton className="h-3.5 w-3/4 md:w-1/2 bg-amber-200/70 dark:bg-amber-800/30" />
        </div>
      </div>

      {/* === Top Stats Grid Skeleton === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 md:p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800/60 shadow-sm flex flex-col justify-between h-[140px]">
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-24" /> {/* Label */}
              <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon Box */}
            </div>
            <div>
              <Skeleton className="h-8 w-12 mb-3" /> {/* Big Number */}
              <Skeleton className="h-3 w-32" /> {/* Trend line/text */}
            </div>
          </div>
        ))}
      </div>

      {/* === Charts Grid Skeleton === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Left: Wide Line/Area Chart Skeleton (Span 2) */}
        <div className="lg:col-span-2 p-5 md:p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800/60 shadow-sm h-[400px] flex flex-col">
          <Skeleton className="h-5 w-56 mb-8" /> {/* Chart Title */}
          
          {/* Simulated Chart Area */}
          <div className="flex-1 flex flex-col justify-between relative px-2 pb-6 border-b border-l border-gray-100 dark:border-zinc-800">
            {/* Horizontal Grid Lines */}
            <div className="w-full h-px bg-gray-100 dark:bg-zinc-800/50" />
            <div className="w-full h-px bg-gray-100 dark:bg-zinc-800/50" />
            <div className="w-full h-px bg-gray-100 dark:bg-zinc-800/50" />
            <div className="w-full h-px bg-gray-100 dark:bg-zinc-800/50" />
            
            {/* Animated Graph Line (Simulating the flatline with a spike at the end) */}
            <svg className="absolute inset-0 w-full h-full text-green-500/20 dark:text-green-500/10 animate-pulse" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
              <path d="M0,99 L85,99 L90,60 L95,99 L100,99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500/50" />
              <path d="M0,99 L85,99 L90,60 L95,99 L100,99 L100,100 L0,100 Z" fill="currentColor" />
            </svg>
          </div>
          
          {/* X-Axis labels */}
          <div className="flex justify-between px-4 mt-3">
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-3 w-10" />
          </div>
        </div>

        {/* Right: Donut Chart Skeleton (Span 1) */}
        <div className="lg:col-span-1 p-5 md:p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800/60 shadow-sm h-[400px] flex flex-col">
          <Skeleton className="h-5 w-40 mb-8" /> {/* Chart Title */}
          
          <div className="flex-1 flex items-center justify-center">
            {/* Donut Chart Shape */}
            <div className="relative flex items-center justify-center w-48 h-48">
              {/* Outer Ring */}
              <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
              {/* Inner Cutout (Matches background color to make it a donut) */}
              <div className="absolute w-32 h-32 bg-white dark:bg-zinc-950 rounded-full" />
            </div>
          </div>
          
          {/* Legend Items (2 items for this specific chart) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" /> {/* Color Dot */}
                <Skeleton className="h-3 w-20" /> {/* Label */}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsSkeleton;