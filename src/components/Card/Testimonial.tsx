import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  deskripsi: string;
  image: string;
}

const Testimonial = ({ name, deskripsi, image }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-96 h-96 gap-5 ">
      <div className="flex items-center w-full">
        <h2 className="text-Heading-4 font-bold text-center">
          {deskripsi}
        </h2>
      </div>
      <Image
        src={image}
        alt="Person"
        className="circular-image"
        width={80}
        height={80}
      />
      <h3 className="text-Heading-4 font-semibold">{name}</h3>
      <p className="text-Heading-5">Coffe Enthusiast</p>
    </div>
  );
};

export default Testimonial;
