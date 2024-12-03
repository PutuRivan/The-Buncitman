import React from "react";
// import { getSearchQuery } from "@/lib/action/search";
import Header from "@/components/Banner/Header";
import Image from "next/image";
import { getSearchQuery } from "@/lib/action/product";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const SearchPage = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = params; // Mengakses params langsung dari argumen
  const products: Product[] = await getSearchQuery(keyword); // Pastikan fungsi ini mengembalikan array dengan tipe Product

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-2xl mt-10">
        No results found for {keyword}
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="p-20 grid grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            {/* Menggunakan Image dari Next.js */}
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold mt-4">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default SearchPage;
