import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CartSidebar = ({ isOpen, closeCart, items }) => {
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 right-[0] w-[300px] h-full bg-gray-100 shadow-lg overflow-y-auto transition-right duration-300 ease-in-out p-5 z-50`}
        >
          <button
            className="absolute top-2.5 right-[3.75px] text-2xl border-none bg-transparent cursor-pointer"
            onClick={closeCart}
          >
            &times;
          </button>
          <h2>Your Cart</h2>
          <div className="mt-[20]">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div
                  className="flex justify-between py-2 border-b border-gray-300"
                  key={index}
                >
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <button
                    className="ml-2 text-red-600 border-none bg-transparent cursor-pointer"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <button
            className="mt-5 w-full py-2.5 bg-blue-600 text-white border-none cursor-pointer"
            onClick={() => router.push("/viewcart")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  );
};

const handleRemoveItem = (index) => {
  // Add logic to remove item from cart
};

export default CartSidebar;
