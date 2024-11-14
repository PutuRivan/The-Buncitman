import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = ({ id, name, price, image }) => {
  function formatPrice(price) {
    if (price >= 1000) {
      return (
        (price / 1000)
          .toFixed(price % 1000 === 0 ? 0 : 1)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "K"
      );
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <Link href={`/shop/product/${id}`} className="w-auto">
      <figure className="flex justify-center">
        <Image
          src={image}
          alt="Product"
          width={256}
          height={256}
          className="w-64 h-64"
        />
      </figure>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-Heading-3 font-bold">{name}</h2>
          <h4 className="text-Heading-4">{formatPrice(price)}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Product;
