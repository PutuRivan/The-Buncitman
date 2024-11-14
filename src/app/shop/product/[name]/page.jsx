import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

const page = () => {
  return (
    <secton className="grid grid-cols-2 p-20 gap-10">
      <div className="flex justify-center">
        <Image
          src={
            "https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/lsryvdej6vnboy7y83f5.jpg"
          }
          alt="product"
          width={248}
          height={248}
          className="w-[475px] h-[475px]"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="text-Heading-2 font-semibold">Arabica Beans</h1>
          <div className="flex flex-row gap-3  items-center">
            <div className="px-3 border-r-2 border-black">
              <h3 className="text-Heading-3 font-bold">$55</h3>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
              </div>
              <div className="flex flex-row gap-2">
                <p>(3.5 stars)•10 reviews</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-Heading-3 font-semibold">Details</h4>
            <p className="text-Heading-4">
              Our premium Arabica beans are sourced from the finest farms. Enjoy
              a rich flavor profile that elevates your coffee experience.
            </p>
          </div>
        </div>
        <form action="" className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <button className=" border-2 border-black p-2">Add to Cart</button>
            <button className=" border-2 border-black p-2 bg-black text-white">Buy Now</button>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="">Quantity</label>
            <div className="border-y-2 border-black flex flex-row gap-4  w-full">
              <button className="border-x-2 border-black w-full h-full p-2 flex justify-center">
                <IoIosRemove size={24} />
              </button>
              <div className="p-2 text-center w-full">
                <p className="">1</p>
              </div>
              <button className="border-x-2 border-black w-full h-full p-2 flex justify-center">
                <IoMdAdd size={24} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </secton>
  );
};

export default page;
