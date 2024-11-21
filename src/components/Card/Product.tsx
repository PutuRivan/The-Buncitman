import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  price: number;
  imageUrl: string;
}

const Product = ({ name, price, imageUrl }: Props) => {
  return (
    <Link href={`/shop/product/${name}`} className="w-auto">
      <figure className="flex justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={256}
          height={256}
          className="w-64 h-64"
        />
      </figure>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-Heading-3 text-blue-500 font-bold">{name}</h2>
          <h4 className="text-Heading-4 text-red-800">{formatPrice(price)}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Product;