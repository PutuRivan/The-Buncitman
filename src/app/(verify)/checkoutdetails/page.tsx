"use client";

import { formatPrice } from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { deleteItem, deleteOrders, getAllOrders } from "@/lib/action/orders";
import Order from "@/components/Card/Order";
import { createInvoice } from "@/lib/action/transaction";
import AddressContainer from "@/components/checkoutdetails/AddressContainer";

interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

interface checkoutOptions {
  Orders: Order[];
}

const Page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("Go Send");

  const username = session?.user?.name;
  const email = session?.user?.email;

  useEffect(() => {
    if (!username) {
      toast({
        title: "error",
        description: "Oops you must login",
        variant: "destructive",
      });
      return;
    }
    const fetch = async () => {
      const response = await getAllOrders({ username });
      setOrders(response);
    };
    fetch();
  }, [username, toast]);

  const calculateSubtotal = () =>
    orders.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  // Calculate Prices
  const shippingFee = selectedShipping === "JNE" ? 15000 : 25000;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  // Address Handler
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, totalAmount: item.quantity * item.product.price }
          : item
      )
    );
  };

  const handleRemove = async (id: string) => {
    const remove = await deleteItem({ id });
    if (remove) {
      const DeleteItems = orders.filter((item) => item.id !== id);
      setOrders(DeleteItems);
    }
  };

  const handleCheckout = async (
    username: string,
    email: string,
    total: number,
    options: checkoutOptions
  ) => {
    try {
      const result = await createInvoice({
        orders: options.Orders,
        total,
        email,
        username,
        selectedShipping,
        shippingFee,
      });
      // Redirect jika berhasil
      if (result.invoice_url) {
        window.location.href = result.invoice_url;
        await deleteOrders(username);
      } else {
        console.error("Invoice URL not found", result);
      }
    } catch (error) {
      console.error("Checkout Error", error);
    }
  };

  return (
    <main className="flex flex-col my-10 px-4 sm:px-10">
      {/* Address Section */}
      <AddressContainer />

      {/* Main Content */}
      <section className="flex flex-col lg:flex-row gap-5">
        {/* Product List */}
        <div className="lg:w-3/4 bg-white border border-neutral-100 rounded-lg shadow-sm p-5">
          <div className="font-bold text-neutral-500 flex items-center gap-3 mb-5">
            <h1>Lihat dulu pesananmu :</h1>
          </div>
          <div className="overflow-y-auto h-96">
            <table className="w-full">
              <thead>
                <tr className="text-left text-neutral-600">
                  <th></th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <Order
                    key={index}
                    id={item.id}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                    totalAmount={item.totalAmount}
                    imageUrl={item.product.imageUrl}
                    handleRemove={(e) => {
                      e.preventDefault();
                      handleRemove(item.id);
                    }}
                    handleQuantityChange={handleQuantityChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:w-1/3 bg-white border border-neutral-100 rounded-lg shadow-sm p-5">
          <h2 className="text-lg text-blue-500 font-semibold text-center mb-4">
            Delivery Details
          </h2>

          {/* Shipping Options */}
          <h3 className="font-semibold mb-2">Shipping Options</h3>
          <div className="flex flex-col gap-2">
            {["Go Send", "JNE"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={option}
                  checked={selectedShipping === option}
                  onChange={() => {
                    setSelectedShipping(option);
                  }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Summary Details */}
          <div className="mt-6 text-neutral-700">
            <div className="flex justify-between">
              <h4>Subtotal Produk:</h4>
              <p>{formatPrice(calculateSubtotal())}</p>
            </div>
            <div className="flex justify-between">
              <h4>Subtotal Pengiriman:</h4>
              <p>{formatPrice(shippingFee)}</p>
            </div>
            <div className="flex justify-between font-semibold text-neutral-900 mt-4">
              <h4>Total:</h4>
              <p>{formatPrice(total)}</p>
            </div>
          </div>

          {/* Buat Checkout Button */}
          <button
            className="bg-blue-500 text-white w-full py-2 mt-4 rounded-md hover:bg-blue-600"
            onClick={() =>
              handleCheckout(username as string, email as string, total, {
                Orders: orders,
              })
            }
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
};

export default Page;
