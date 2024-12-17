"use client";

import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import ProductSkeleton from "@/components/skeleton/Product-Skeleton";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getSearchQuery(decodedKeyword);
        setProducts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [decodedKeyword]);

  if (loading) {
    return (
      <div className="p-5 flex flex-col gap-10">
        <h2 className="text-Heading-2 font-bold">
          Hasil Pencarian Untuk {decodedKeyword}
        </h2>
          <ProductSkeleton />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-10">
        <h2 className="text-Heading-2 font-bold">
          Hasil Pencarian Untuk {decodedKeyword}
        </h2>
        <div className="grid grid-cols-4 gap-10 mx-10">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
