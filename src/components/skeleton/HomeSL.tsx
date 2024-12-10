import React from "react";

const HomeSL: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Hero Section Skeleton */}
      <div className="animate-pulse w-full h-full max-w-7xl px-4 sm:px-8">
        <div className="relative h-[70vh] w-full bg-gray-300 rounded-lg overflow-hidden">
          {/* Hero Image Skeleton */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300"></div>
        </div>
        {/* Text Content Skeleton */}
        <div className="mt-8 space-y-4">
          <div className="h-10 w-2/5 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-3/5 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeSL;
