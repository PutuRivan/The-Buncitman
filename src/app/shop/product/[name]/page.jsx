import { getProductDetails } from "@/app/api/products";
import AddToCart from "@/components/Form/AddToCart";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

const page = async ({ params: { name } }) => {
  const details = await getProductDetails(name);
  function formatPrice(price) {
    if (price >= 1000) {
      return (
        (price / 1000)
          .toFixed(price % 1000 === 0 ? 0 : 1)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "K"
      );
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const random = parseInt(Math.random() * 5) + 1;
  console.log(random);
  
  return (
    <section className="grid grid-cols-2 p-20 gap-10">
      <div className="flex justify-center">
        <Image
          src={details.imageUrl}
          alt="product"
          width={248}
          height={248}
          className="w-[475px] h-[475px]"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="text-Heading-2 text-blue-800 font-semibold">
            {details.name}
          </h1>
          <div className="flex flex-row gap-3  items-center">
            <div className="px-3 border-r-2 border-black">
              <h3 className="text-Heading-3 text-blue-500 font-bold">
                {formatPrice(details.price)}
              </h3>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                {Array(random)
                  .fill()
                  .map((_, index) => (
                    <FaStar size={20} key={index} />
                  ))}
              </div>
              <div className="flex flex-row gap-2">
                <p>({random})•{parseInt(Math.random() * 50) + 1} reviews</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-Heading-3 text-blue-500 font-semibold">
              Details
            </h4>
            <p className="text-Heading-4 text-red-800">{details.description}</p>
          </div>
        </div>
        <AddToCart />
      </div>
    </section>
  );
};

export default page;
