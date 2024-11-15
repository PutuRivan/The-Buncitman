import Link from "next/link";
import React from "react";
import { FaCaretLeft } from "react-icons/fa6";

const page = () => {
  return (
    <section className="p-10 flex flex-row gap-20">
      <div className="w-3/4 p-2">
        <div className="flex justify-between">
          <h1 className="text-Heading-2 text-blue-800 font-bold">
            Billing Details
          </h1>
          <div className="flex flex-row items-center">
            <FaCaretLeft size={16} />
            <Link href={"/viewcart"}>back to cart</Link>
          </div>
        </div>
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="">First Name</label>
              <input type="text" className="border-2 border-black p-2" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Last Name</label>
              <input type="text" className="border-2 border-black p-2" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Street Address</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Apartment, Suit, unit, etc (optional)</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Town City</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Town City</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Provinsi</label>
            <select
              name=""
              id=""
              className="flex flex-row p-2 border-2 border-black"
            >
              <option value="" className="flex flex-row gap-2">
                Jakarta Utara
              </option>
              <option value="" className="flex flex-row gap-2">
                Jakarta Timur
              </option>
              <option value="" className="flex flex-row gap-2">
                Jakarta Pusat
              </option>
              <option value="" className="flex flex-row gap-2">
                Jakarta Barat
              </option>
              <option value="" className="flex flex-row gap-2">
                Jakarta Selatan
              </option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">PostCode / ZIP</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Phone</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Email Address</label>
            <input type="text" className="border-2 border-black p-2" />
          </div>
          <div className="flex w-full">
            <textarea
              placeholder="Order Notes..."
              className="border-2 border-black p-2 w-full"
            />
          </div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col pt-16 gap-5">
        <div className="flex flex-row justify-between items-center">
          <figure className="flex flex-row gap-2 items-center">
            <img
              src="https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/lsryvdej6vnboy7y83f5.jpg"
              alt="product"
              className="w-20 h-20"
            />
            <figcaption>Arabica Beans</figcaption>
          </figure>
          <div>
            <p>Rp.295.000</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h2>subTotal</h2>
            <h2>Rp. 295.000</h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2>subTotal</h2>
            <h2>Rp. 295.000</h2>
          </div>
        </div>
        <div className="flex flex-col mx-5 border-2 border-black p-5">
          <div className="flex flex-row gap-2">
            <input type="radio" />
            <label htmlFor="">Transfer Bank-BCA</label>
          </div>
          <div className="flex flex-row gap-2">
            <input type="radio" />
            <label htmlFor="">Transfer Bank-BCA</label>
          </div>
        </div>
        <button className="border-2 border-black p-3 mx-20">Submit</button>
      </div>
    </section>
  );
};

export default page;
