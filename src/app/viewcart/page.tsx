"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoMdClose } from "react-icons/io";

const Page = () => {
  const router = useRouter();
  return (
    <section className="p-10 flex flex-row gap-5 w-full">
      <div className="w-3/4">
        <table className="w-full">
          <thead>
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
            <tr>
              <td>
                <IoMdClose size={24} />
              </td>
              <td className="px-4 py-2 ">
                <div className="flex justify-center">
                  <img
                    src="https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/lsryvdej6vnboy7y83f5.jpg"
                    alt="produk"
                    className="w-20 h-20 rounded-md"
                  />
                </div>
              </td>
              <td>Arabica Beans</td>
              <td className="px-4 py-2">Rp 295,000</td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button className="bg-gray-200 px-2 py-1 rounded-l-md">
                    -
                  </button>
                  <span className="bg-gray-100 px-2 py-1 rounded">1</span>
                  <button className="bg-gray-200 px-2 py-1 rounded-r-md">
                    +
                  </button>
                </div>
              </td>
              <td className="px-4 py-2">Rp 295,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-blue-500 w-1/3">
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-Heading-3 text-blue-500 font-semibold text-center">
            Cart Totals
          </h2>
          <div className="flex justify-between mt-2">
            <h1>Subtotal</h1>
            <h2>Rp 885,000</h2>
          </div>
          <div>
            <h1>Shipping</h1>
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
            <div className="flex justify-between mt-2">
              <h1>Total</h1>
              <h2>Rp 885,000</h2>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              onClick={() => router.push("/viewcart/checkoutdetails")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
