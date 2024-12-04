import React from "react";
import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getAllProducts } from "@/lib/GET/productCategories";

// interface ProductProps {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// interface ShopProps {
//   products: ProductProps[];
//   name: string;
// }

const Shop = async () => {
  const name = "Coffee Beans";

  // Fetch data dari Prisma
  const productsData = await getAllProducts(name);
  const products = productsData.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    imageUrl: item.product.imageUrl,
  }));

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
      </section>
    </>
  );
};

export default Shop;
