import React from "react";

const ProductSkeleton = () => {
  return (
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
  );
};

export default ProductSkeleton;
