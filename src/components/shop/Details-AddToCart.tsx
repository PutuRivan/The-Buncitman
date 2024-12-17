"use client";

import { useToast } from "@/hooks/use-toast";
import { postCarts } from "@/lib/action/cart";
import { postBuyNow } from "@/lib/action/orders";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useState } from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";

interface Props {
  ProductName: string;
  ProductId: string;
}

const AddToCart = ({ ProductName, ProductId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false); // Global lock state
  const { data: session } = useSession();
  const { toast } = useToast();
  
  const username = session?.user?.name;

  const handleGlobalLoading = (state: boolean) => {
    setGlobalLoading(state);
  };

  const handleMinus = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleBuyNow: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setBuyNowLoading(true);
    handleGlobalLoading(true);
    try {
      if (!username) {
        toast({
          title: "error",
          description: "Oops you must login",
          variant: "destructive",
        });
        return;
      }
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
        window.location.href = "/checkoutdetails";
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "error",
        description: "Oops something went wrong",
        variant: "destructive",
      });
    } finally {
      setBuyNowLoading(false);
      handleGlobalLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAddToCartLoading(true);
    handleGlobalLoading(true);
    try {
      if (!username) {
        toast({
          title: "error",
          description: "Oops you must login",
          variant: "destructive",
        });
        return;
      }
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
    } finally {
      setAddToCartLoading(false);
      handleGlobalLoading(false);
    }
  };

  return (
    <div className="relative grid grid-cols-2 gap-3">
      {/* Global Loading Overlay */}
      {globalLoading && (
        <div className="fixed inset-0 bg-black opacity-25 z-50 pointer-events-auto" />
      )}

      <div className="flex flex-col gap-3">
        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          disabled={addToCartLoading || globalLoading}
          className="border-2 border-black p-2"
        >
          {addToCartLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
          ) : (
            "Add to Cart"
          )}
        </Button>

        {/* Buy Now Button */}
        <Button
          onClick={handleBuyNow}
          disabled={buyNowLoading || globalLoading}
          className="border-2 border-black p-2 bg-black text-white"
        >
          {buyNowLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Buy Now"
          )}
        </Button>
      </div>

      {/* Quantity Input */}
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
            className="w-full text-center bg-neutral-50"
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
