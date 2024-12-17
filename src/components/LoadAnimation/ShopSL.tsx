import React from "react";

const ShopSL: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-10 py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="h-[210px] w-full bg-gray-300 rounded-lg animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-8">
        {/* Title and Description */}
        <div className="text-center space-y-4">
          <div className="h-14 w-60 bg-gray-300 rounded-md mx-auto animate-pulse"></div>
          <div className="h-8 w-1/2 bg-gray-300 rounded-md mx-auto animate-pulse"></div>
        </div>

        {/* Category Selector Skeleton */}
        <div className="flex justify-end">
          <div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        <div className="flex justify-start">
          <div className="h-12 w-1/3 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-4 gap-10">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="space-y-4">
              {/* Product Image Skeleton */}
              <div className="h-40 w-full bg-gray-300 rounded-md animate-pulse"></div>
              {/* Product Name Skeleton */}
              <div className="h-6 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
              {/* Product Price Skeleton */}
              <div className="h-6 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSL;
