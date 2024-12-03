"use client";

import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getSearchQuery } from "@/lib/action/product";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Page = () => {
  const params = useParams<{ keyword: string }>();
  const decodedKeyword = decodeURIComponent(params.keyword);
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    const data = async () => {
      const response = await getSearchQuery(decodedKeyword);
      setProduct(response);
    };
    data();
  });
  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-10">
        <h2 className="text-Heading-2 font-bold">
          Hasil Pencarian Untuk {decodedKeyword}
        </h2>
        <div className="grid grid-cols-4 gap-10 mx-10">
          {product.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
