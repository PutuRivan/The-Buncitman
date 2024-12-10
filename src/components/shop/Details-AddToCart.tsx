"use client";

import { useToast } from "@/hooks/use-toast";
import { postCarts } from "@/lib/action/cart";
import { postBuyNow } from "@/lib/action/orders";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useState } from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

interface Props {
  ProductName: string;
  ProductId: string;
}

const AddToCart = ({ ProductName, ProductId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const { toast } = useToast();

  const username = session?.user?.name;

  const handleMinus = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleBuyNow: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!username) {
      toast({
        title: "error",
        description: "Oops you must login",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await postBuyNow({ username, quantity, ProductId });

      if (!response) {
        toast({
          title: "error",
          description: "Oops something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "success",
          description: "Berhasil Menambahkan ke dalam Order",
          variant: "success",
        });
        window.location.reload();
        window.location.href = "/checkoutdetails";
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "error",
        description: "Oops something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async () => {
    if (!username) {
      toast({
        title: "error",
        description: "Oops you must login",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await postCarts({ ProductName, username, quantity });

      if (!response) {
        toast({
          title: "error",
          description: "Oops something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "success",
          description: "Berhasil Menambahkan ke dalam cart",
          variant: "success",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "error",
        description: "Oops something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          type="submit"
          className="border-2 border-black p-2"
        >
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
        <label htmlFor="quantity">Quantity</label>
        <div className="border-y-2 border-black flex flex-row gap-4 w-full">
          <button
            type="button"
            onClick={handleMinus}
            className="border-x-2 border-black w-full h-full p-2 flex justify-center"
          >
            <IoIosRemove size={24} />
          </button>
          <input
            id="quantity"
            type="text"
            value={quantity}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              if (!isNaN(newValue) && newValue > 0) {
                setQuantity(newValue);
              }
            }}
            className="w-full text-center"
          />
          <button
            type="button"
            onClick={handlePlus}
            className="border-x-2 border-black w-full h-full p-2 flex justify-center"
          >
            <IoMdAdd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
