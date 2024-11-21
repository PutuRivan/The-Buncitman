import React from "react";

interface Props {
  name: string;
  deskripsi: string;
}

const Testimonial = ({ name, deskripsi }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-96 h-96 gap-5 ">
      <div className="flex items-center w-full">
        <h2 className="text-Heading-4 text-blue-500 font-bold text-center">
          {deskripsi}
        </h2>
      </div>
      <img
        src="https://placehold.co/600x400"
        alt="Person"
        className="circular-image"
      />
      <h3 className="text-Heading-4 text-blue-500 font-semibold">{name}</h3>
      <p className="text-Heading-5 text-red-800">Coffe Enthusiast</p>
    </div>
  );
};

export default Testimonial;
