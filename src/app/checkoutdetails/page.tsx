"use client";

import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Page = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col my-10">
      <section className="px-10 mx-10 bg-white border-2 border-neutral-100 border-hidden">
        <div className="p-5">
          <div className="flex flex-row gap-3 items-center">
            <FaMapMarkerAlt />
            <h1>Alamat Pengiriman</h1>
          </div>
          <div className="flex flex-row gap-5">
            <h1>Putu Rivan (+62)81288188592</h1>
            <p>
              Tria Adara Residence 10 no a 01, KOTA TANGERANG SELATAN -
              PAMULANG, BANTEN, ID 15434
            </p>
            <button className="text-blue-500">Ubah</button>
          </div>
        </div>
      </section>

      <section className="px-10 py-4 flex flex-row gap-5 w-full">
        <div className="w-3/4 border-2 border-neutral-100 border-hidden bg-white py-5 px-2">
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
        <div className=" w-1/3 border-2 border-neutral-100 border-hidden bg-white py-5 px-2">
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
              <h3>{formatPrice(500000)}</h3>
            </div>
            <div className="flex items-center justify-between">
              <h1>Subtotal Pengiriman : </h1>
              <h3>{formatPrice(500000)}</h3>
            </div>
            <div className="flex items-center justify-between">
              <h1>Total : </h1>
              <h2>{formatPrice(500000)}</h2>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                onClick={() => router.push("/viewcart/checkoutdetails")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
