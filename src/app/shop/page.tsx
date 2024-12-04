"use client";

import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getAllProducts } from "@/lib/action/productCategories";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  productId: string;
  categoryId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
  category: {
    id: string;
    name: string;
  };
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Coffee Beans");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts(selectedCategory);
        setProducts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

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

        <div className="flex justify-end">
          <select
            className="border px-4 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Coffee Beans">Coffee Beans</option>
            <option value="Coffee Drinks">Coffee Drinks</option>
          </select>
        </div>

        <div>
          <h2 className="text-Heading-2 mb-5 font-bold">{selectedCategory}</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-4 gap-10 mx-10">
              {products
                .filter((item) => item.category.name === selectedCategory)
                .map((item) => (
                  <Product
                    key={item.id}
                    id={item.product.id}
                    name={item.product.name}
                    price={item.product.price}
                    imageUrl={item.product.imageUrl}
                  />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;