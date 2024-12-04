"use client";

import Order from "@/components/Card/Order";
import AddressContainer from "@/components/checkout/AddressContainer";
import Details from "@/components/checkout/Details";
import { useToast } from "@/hooks/use-toast";
import { deleteItem, getAllOrders } from "@/lib/action/orders";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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

const Page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);

  const username = session?.user?.name;

  const handleRemove = async (id: string) => {
    const remove = await deleteItem({ id });
    if (remove) {
      const DeleteItems = orders.filter((item) => item.id !== id);
      setOrders(DeleteItems);
    }
  };

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

  const totalProduk = () =>{
    return orders.reduce((total, item) => total + item.totalAmount, 0);
  }
  
  return (
    <main className="flex flex-col my-10">
      <AddressContainer />

      <section className="px-10 py-4 flex flex-row gap-5 w-full">
        <div className="w-3/4 border-2 border-neutral-100 border-hidden bg-white py-5 px-2">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead className="border-b-2 border-neutral-100">
                <tr>
                  <th></th>
                  <th></th>
                  <th className="">Product</th>
                  <th className="">Price</th>
                  <th className="">Quantity</th>
                  <th className="">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <Order
                    key={index}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                    totalAmount={item.totalAmount}
                    imageUrl={item.product.imageUrl}
                    handleRemove={() => handleRemove(item.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" w-1/3 border-2 border-neutral-100 border-hidden bg-white py-5 px-2">
          <Details 
            totalProduk={totalProduk()}
          />
        </div>
      </section>
    </main>
  );
};

export default Page;
