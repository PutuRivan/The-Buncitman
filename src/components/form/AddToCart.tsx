"use client";

import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

const AddToCart = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleBuyNow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    router.push("/viewcart");
  };

  const handleAddToCart: MouseEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Add to cart logic here
  };

  return (
    <form onSubmit={handleAddToCart} className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <button type="submit" className="border-2 border-black p-2">
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="border-2 border-black p-2 bg-black text-white"
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="">Quantity</label>
        <div className="border-y-2 border-black flex flex-row gap-4 w-full">
          <button
            type="button"
            onClick={handleMinus}
            className="border-x-2 border-black w-full h-full p-2 flex justify-center"
          >
            <IoIosRemove size={24} />
          </button>
          <div className="p-2 text-center w-full">
            <p>{quantity}</p>
          </div>
          <button
            type="button"
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
