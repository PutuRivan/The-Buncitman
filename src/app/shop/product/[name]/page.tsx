"use client";

import Header from "@/components/Banner/Header";
import AddToCart from "@/components/form/AddToCart";
import { getProductDetails } from "@/lib/action/productCategories";
import { formatPrice } from "@/utils/formatPrice";
import { random } from "@/utils/randomStars";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const Page = () => {
  const params = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(params.name);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getProductDetails(decodedName);
        setProduct(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [decodedName]);

  if (!product) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  return (
    <>
      <Header />
      <section className="grid grid-cols-2 p-20 gap-10">
        <div className="flex justify-center">
          <Image
            src={product.imageUrl}
            alt="product"
            width={248}
            height={248}
            className="w-[475px] h-[475px]"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-Heading-2 font-semibold">{product.name}</h1>
            <div className="flex flex-row gap-3  items-center">
              <div className="px-3 border-r-2 border-black">
                <h3 className="text-Heading-3 font-bold">
                  {formatPrice(product.price)}
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  {Array(random(5))
                    .fill(2)
                    .map((_, index) => (
                      <FaStar
                        size={20}
                        key={index}
                        className="text-yellow-600"
                      />
                    ))}
                </div>
                <div className="flex flex-row gap-2">
                  <p>
                    ({random(5)})•{random(50)} reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-Heading-3 font-semibold">Details</h4>
              <p className="text-Heading-4">{product.description}</p>
            </div>
          </div>
          <AddToCart ProductName={product.name} />
        </div>
      </section>
    </>
  );
};

export default Page;
