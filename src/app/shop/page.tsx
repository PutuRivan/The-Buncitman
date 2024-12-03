"use client";

import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getAllProducts } from "@/lib/GET/productCategories";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
}

interface ProductResponse {
  id: string;
  product: Product;
}

const Shop = () => {
  const name = "Coffee Beans";
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts(name);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <section className="flex flex-col gap-10 p-10">
        <div className="text-center">
          <h1 className="text-Heading-1 font-bold">Products</h1>
          <p className="text-Heading-3 font-semibold">
            Discover our premium coffee beans and bottled delights.
          </p>
        </div>

        <div>
          <h2 className="text-Heading-2 font-bold">{name}</h2>
          <div className="grid grid-cols-4 gap-10 mx-10">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.product.id}
                name={item.product.name}
                price={item.product.price}
                imageUrl={item.product.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
