import Product from "@/components/Card/Product";
import { product } from "@/data/product";
import React from "react";

// Separate products into beans and drinks based on their IDs
const coffeeBeans = product.filter((item) => item.id <= 14); // IDs 1-14 = beans
const coffeeDrinks = product.filter((item) => item.id > 14); // IDs 15-25 = drinks

const Shop = async () => {
  return (
    <>
      <section className="flex flex-col gap-10 p-10">
        <div>
          <h1 className="text-Heading-1 text-red-500 font-bold">Products</h1>
          <p className="text-Heading-3 text-blue-500 font-semibold">
            Discover our premium coffee beans and bottled delights.
          </p>
        </div>

        {/* Coffee Beans Section */}
        <div>
          <h2 className="text-Heading-2 font-bold text-green-600">Coffee Beans</h2>
          <div className="grid grid-cols-4 gap-10 mx-10">
            {coffeeBeans.map((item) => (
              <Product
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>

        {/* Coffee Drinks Section */}
        <div>
          <h2 className="text-Heading-2 font-bold text-yellow-600">Coffee Drinks</h2>
          <div className="grid grid-cols-4 gap-10 mx-10">
            {coffeeDrinks.map((item) => (
              <Product
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
