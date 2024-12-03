import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getSearchQuery } from "@/lib/action/product";
import React from "react";

interface Props {
  params: {
    keyword: string;
  };
}

interface ProductType {  
  id: string;  
  name: string;  
  price: number;  
  imageUrl: string;  
}  

const Page = async ({ params }: Props) => {  
  const { keyword } = params;  
  const decodedKeyword = decodeURIComponent(keyword);  
  
  let products: ProductType[] = [];  

  try {  
    products = await getSearchQuery(decodedKeyword);  
  } catch (error) {  
    console.error('Error fetching products:', error);  
    // Anda dapat mengatur state untuk menampilkan pesan kesalahan  
  }  

  return (  
    <>  
      <Header />  
      <div className="p-5 flex flex-col gap-10">  
        <h2 className="text-Heading-2 font-bold">  
          Hasil Pencarian Untuk: {decodedKeyword}  
        </h2>  
        <div className="grid grid-cols-4 gap-10 mx-10">  
          {products.map((item) => (  
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
