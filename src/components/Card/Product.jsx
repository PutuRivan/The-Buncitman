import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Product = () => {
  return (
    <div>
      <figure className="">
        <img src="https://placehold.co/600x400" alt="Product" />
      </figure>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-Heading-3 font-bold">Arabica Beans</h2>
          <h3 className="text-Heading-4 font-semibold">Medium</h3>
          <h4 className="text-Heading-2">55K</h4>
        </div>
        <div>
          <FaRegHeart size={45} />
        </div>
      </div>
    </div>
  );
};

export default Product;
