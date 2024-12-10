import React from "react";

const ProductSL: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-pulse grid grid-cols-2 p-20 gap-10 w-full max-w-7xl">
        {/* Product Image Skeleton */}
        <div className="flex justify-center">
          <div className="w-[475px] h-[475px] bg-gray-300 rounded-md"></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-5">
          {/* Product Name Skeleton */}
          <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>

          {/* Price and Ratings Skeleton */}
          <div className="flex flex-row gap-5 mb-5 items-center">
            {/* Price Skeleton */}
            <div className="h-8 w-14 bg-gray-300 rounded-md"></div>
            {/* Star Ratings Skeleton */}
            <div className="flex flex-row gap-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-3 w-3 bg-gray-300 rounded-full"
                  ></div>
                ))}
            </div>
            {/* Reviews Count Skeleton */}
            <div className="h-4 w-14 bg-gray-300 rounded-md"></div>
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col mb-6 gap-3">
            <div className="h-5 w-1/6 bg-gray-300 mb-1 rounded-md"></div>
            <div className="h-4 w-7/8 bg-gray-300 rounded-md"></div>
            <div className="h-4 w-4/6 bg-gray-300 rounded-md"></div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className="h-10 w-1/2 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSL;
