"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

const AddToCart = () => {
  const router = useRouter();

  const [Quantity, setQuantity] = useState(0);

  const handleMinus = (event) => {
    event.preventDefault();
    if (Quantity <= 0) return null;
    setQuantity(Quantity - 1);
  };

  const handlePlus = (event) => {
    event.preventDefault();
    setQuantity(Quantity + 1);
  };

  const handleBuyNow = (event) => {
    event.preventDefault();
    router.push("/viewcart");
  };

  return (
    <form action="" className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <button className=" border-2 border-black p-2">Add to Cart</button>
        <button
          onClick={handleBuyNow}
          className=" border-2 border-black p-2 bg-black text-white"
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="">Quantity</label>
        <div className="border-y-2 border-black flex flex-row gap-4  w-full">
          <button
            onClick={handleMinus}
            className="border-x-2 border-black w-full h-full p-2 flex justify-center"
          >
            <IoIosRemove size={24} />
          </button>
          <div className="p-2 text-center w-full">
            <p className="">{Quantity}</p>
          </div>
          <button
            onClick={handlePlus}
            className="border-x-2 border-black w-full h-full p-2 flex justify-center"
          >
            <IoMdAdd size={24} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddToCart;
