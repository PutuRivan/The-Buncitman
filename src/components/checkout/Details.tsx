import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import React from "react";

interface Details {
  totalProduk: number;
}

const Details = ({ totalProduk }: Details) => {
  const router = useRouter();
  const totalPengiriman = 10000;

  const Total = totalProduk + totalPengiriman;
  return (
    <div className="p-4 rounded-md">
      <h2 className="text-Heading-3 text-blue-500 font-semibold text-center">
        Delivery Details
      </h2>
      <h3>Shipping Options</h3>
      <div className="flex flex-col px-5">
        <div className="flex flex-row gap-2">
          <input type="radio" className="p-2" />
          <label htmlFor="">Go Send</label>
        </div>
        <div className="flex flex-row gap-2">
          <input type="radio" />
          <label htmlFor="">Go Send</label>
        </div>
      </div>
      <h3>Payment Methods</h3>
      <div className="flex flex-col px-5">
        <div className="flex flex-row gap-2">
          <input type="radio" className="p-2" />
          <label htmlFor="">Transfer BCA</label>
        </div>
        <div className="flex flex-row gap-2">
          <input type="radio" />
          <label htmlFor="">Transfer BNI</label>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1>Subtotal Produk : </h1>
        <h3>{formatPrice(totalProduk)}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h1>Subtotal Pengiriman : </h1>
        <h3>{formatPrice(totalPengiriman)}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h1>total : </h1>
        <h2>{formatPrice(Total)}</h2>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          onClick={() => router.push("/")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Details;
