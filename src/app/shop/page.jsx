
import Product from "@/components/Card/Product";
import React from "react";
import { getProducts } from "../pages/api/products";

const Shop = async () => {
  const products = await getProducts();
  return (
    <>
      <section className="flex flex-col gap-10 p-10">
        <div>
          <h1 className="text-Heading-1 font-bold">Products</h1>
          <p className="text-Heading-3 font-semibold">
            Discover our premium coffee beans and bottled delights.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-10 mx-10">
          {products.map((item) => (
            <Product
              key={item.id}
              name={item.name}
              price={item.price}
              id={item.id}
              image={item.imageUrl}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;
