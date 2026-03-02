import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility function from shadcn/ui

// A reusable Skeleton primitive (you might already have this from shadcn/ui)
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
);

const AnalyticsSkeleton = () => {
  return (
    <div className="p-4 space-y-5">
      {/* Page Title Skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-8 w-8 rounded-sm" /> {/* Icon */}
        <Skeleton className="h-8 w-48" /> {/* Title Text */}
      </div>

      {/* === Top Stats Grid Skeleton === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-xl border shadow-sm h-32 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" /> {/* Label */}
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
            </div>
            <Skeleton className="h-10 w-16" /> {/* Value */}
          </div>
        ))}
      </div>

      {/* === Charts Grid Skeleton === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie Chart Skeleton */}
        <div className="p-6 bg-card rounded-xl border shadow-sm h-[400px] flex flex-col">
          <Skeleton className="h-6 w-40 mb-6" /> {/* Chart Title */}
          <div className="flex-1 flex items-center justify-center">
            {/* Circular skeleton for pie chart */}
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            {/* Legend items */}
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Bar/Line Chart Skeleton */}
        <div className="p-6 bg-card rounded-xl border shadow-sm h-[400px] flex flex-col">
          <Skeleton className="h-6 w-40 mb-6" /> {/* Chart Title */}
          <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-l border-muted">
            {/* Simulated bars for the chart */}
            <Skeleton className="h-1/3 w-full rounded-t-md" />
            <Skeleton className="h-1/2 w-full rounded-t-md" />
            <Skeleton className="h-2/3 w-full rounded-t-md" />
            <Skeleton className="h-3/4 w-full rounded-t-md" />
            <Skeleton className="h-1/2 w-full rounded-t-md" />
            <Skeleton className="h-2/3 w-full rounded-t-md" />
            <Skeleton className="h-1/3 w-full rounded-t-md" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsSkeleton;