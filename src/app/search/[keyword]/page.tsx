import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getSearchQuery } from "@/lib/action/product";
import React from "react";

interface ProductType {
  id: string;
  name: string;
  price: number; // Ganti dengan tipe yang sesuai
  imageUrl: string;
}

interface Props {
  params: {
    keyword: string;
  };
}
const page = async ({ params }: Props) => {
  const { keyword } = params;
  const decodedKeyword = decodeURIComponent(keyword);

  const product: ProductType[] = await getSearchQuery(decodedKeyword);
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

export default page;
