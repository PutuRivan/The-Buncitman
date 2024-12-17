import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Product = ({ name, price, imageUrl }: Props) => {
  return (
    <Link
      href={`/shop/product/${name}`}
      className="block w-full p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-neutral-50 hover:bg-neutral-100"
    >
      {/* Product Image */}
      <figure className="relative flex justify-center items-center overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={name}
          width={256}
          height={256}
          className="w-64 h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Product Details */}
      <div className="mt-4 text-center">
        {/* Product Name */}
        <h2 className="text-lg font-bold text-neutral-800 truncate">{name}</h2>
        
        {/* Product Price */}
        <h4 className="text-sm font-semibold text-primary-600 mt-2">
          {formatPrice(price)}
        </h4>
      </div>
    </Link>
  );
};

export default Product;
