"use client";

import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getAllProducts } from "@/lib/action/productCategories";
import React, { useEffect, useState } from "react";
import ProductSkeleton from "@/components/LoadAnimation/ProductSL";

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

const Shop: React.FC = () => {
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
        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-Heading-1 font-bold text-neutral-800">Products</h1>
          <p className="text-Heading-3 font-semibold text-neutral-500">
            Discover our premium coffee beans and bottled delights.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-end">
          <select
            className="border border-neutral-300 bg-neutral-100 px-4 py-3 rounded focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 text-neutral-800"
            value={selectedCategory}
            onChange={(e) => {
              e.preventDefault();
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="Coffee Beans">Coffee Beans</option>
            <option value="Coffee Drinks">Coffee Drinks</option>
          </select>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-Heading-2 mb-5 font-bold text-neutral-700">
            {selectedCategory}
          </h2>
          {loading ? (
            <ProductSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
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
