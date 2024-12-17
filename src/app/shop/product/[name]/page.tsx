"use client";

import Header from "@/components/Banner/Header";
import AddToCart from "@/components/shop/Details-AddToCart";
import { getProductDetails } from "@/lib/action/productCategories";
import { formatPrice } from "@/utils/formatPrice";
import { random } from "@/utils/randomStars";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import DetailsSL from "@/components/LoadAnimation/DetailsSL";
import { Button } from "@/components/ui/button";
import { GoArrowLeft } from "react-icons/go";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const ProductPage: React.FC = () => {
  const params = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(params.name);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const details = await getProductDetails(decodedName);
        setProduct(details);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [decodedName]);

  const handleBack = () => {
    setBackLoading(true);
    setTimeout(() => {
      router.push("/shop");
      setBackLoading(false);
    }, 1000); // Simulated loading time
  };

  if (product === null) {
    return <DetailsSL />;
  }

  return isLoading ? (
    <DetailsSL />
  ) : (
    <>
      {/* Header */}
      <Header />

      {/* Back Button */}
      <div className="p-8">
        <Button
          onClick={handleBack}
          disabled={backLoading}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-600 text-white rounded-md"
        >
          {backLoading ? (
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <GoArrowLeft />
          )}
          <span className="text-sm font-medium">
            {backLoading ? "Loading..." : "More Coffee?"}
          </span>
        </Button>
      </div>

      {/* Product Details Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 lg:p-20">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          {/* Product Name and Price */}
          <div>
            <h1 className="text-Heading-2 font-bold text-neutral-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-Heading-3 font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center gap-1">
                {Array(random(5))
                  .fill(0)
                  .map((_, index) => (
                    <FaStar
                      key={index}
                      size={20}
                      className="text-yellow-500"
                    />
                  ))}
              </div>
              <span className="text-sm text-neutral-500">
                ({random(5)}) • {random(50)} reviews
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h4 className="text-Heading-3 font-semibold text-neutral-900">
              Details
            </h4>
            <p className="text-Heading-4 text-neutral-700">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <AddToCart ProductName={product.name} ProductId={product.id} />
        </div>
      </section>
    </>
  );
};

export default ProductPage;
