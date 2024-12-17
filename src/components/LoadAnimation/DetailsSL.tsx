import React, { useState, useEffect } from "react";

const DetailsSL: React.FC = () => {
  // State to control whether the content is loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (you can replace this with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Stop loading after a delay
    }, 3000); // Simulate a 3-second loading time
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      role="status"
      aria-label="Loading product details"
    >
      <div className="animate-pulse grid grid-cols-2 p-20 gap-10 w-full max-w-7xl relative">
        {/* Product Image Skeleton */}
        <div className="flex justify-center">
          <div
            className="w-[475px] h-[475px] bg-gray-300 dark:bg-gray-700 rounded-md"
            aria-hidden="true"
          ></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-5">
          {/* Product Name Skeleton */}
          <div
            className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"
            aria-hidden="true"
          ></div>

          {/* Price and Ratings Skeleton */}
          <div className="flex flex-row gap-5 mb-5 items-center">
            {/* Price Skeleton */}
            <div
              className="h-8 w-14 bg-gray-300 dark:bg-gray-700 rounded-md"
              aria-hidden="true"
            ></div>
            {/* Star Ratings Skeleton */}
            <div className="flex flex-row gap-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-3 w-3 bg-gray-300 dark:bg-gray-700 rounded-full"
                    aria-hidden="true"
                  ></div>
                ))}
            </div>
            {/* Reviews Count Skeleton */}
            <div
              className="h-4 w-14 bg-gray-300 dark:bg-gray-700 rounded-md"
              aria-hidden="true"
            ></div>
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col mb-6 gap-3">
            <div
              className="h-5 w-1/6 bg-gray-300 dark:bg-gray-700 mb-1 rounded-md"
              aria-hidden="true"
            ></div>
            <div
              className="h-4 w-7/8 bg-gray-300 dark:bg-gray-700 rounded-md"
              aria-hidden="true"
            ></div>
            <div
              className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded-md"
              aria-hidden="true"
            ></div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <div
            className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md relative"
            aria-hidden="true"
          >
            {/* Disable Button and Block Interaction with Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>
            )}
            <button
              className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-md cursor-not-allowed"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSL;
