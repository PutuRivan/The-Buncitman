import type { NextPage } from "next";
import Header from "@/components/Banner/Header";
import Product from "@/components/Card/Product";
import { getSearchQuery } from "@/lib/action/product";

interface PageProps {
  keyword: string;
}

const SearchPage: NextPage<PageProps> = async ({ keyword }) => {
  const decodedKeyword = decodeURIComponent(keyword);

  const product = await getSearchQuery(decodedKeyword);
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

export default SearchPage;

