import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Product = ({id, name, price }) => {
  return (
    <Link href={`/product/${id}`}>
      <figure className="">
        <img src="https://placehold.co/600x400" alt="Product" />
      </figure>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-Heading-3 font-bold">{name}</h2>
          <h4 className="text-Heading-2">{price}</h4>
        </div>
        <div>
          <FaRegHeart size={45} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
