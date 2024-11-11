import Image from "next/image";
import React from "react";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center w-96 gap-5">
      <h2 className="text-Heading-3 font-bold text-center">
        &quot;The Buncitmen&apos;s Coffee is a game changer for my
        mornings!&quot;
      </h2>
      <img
        src="https://placehold.co/600x400"
        alt="Person"
        className="circular-image"
      />
      <h3 className="text-Heading-3 font-semibold">Emily Johnson</h3>
      <p className="text-heading-4">Coffe Enthusiast</p>
    </div>
  );
};

export default Testimonial;
