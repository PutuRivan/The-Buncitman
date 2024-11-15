import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
const Team = () => {
  return (
    <div className="flex flex-col items-center w-96 gap-3">
      <img
        src="https://placehold.co/600x400"
        alt="Person"
        className="circular-image"
      />
      <h3 className="text-Heading-3 text-blue-500 font-semibold">
        Alice Smith
      </h3>
      <p className="text-Heading-4 text-red-800">Head Barista</p>
      <div></div>
    </div>
  );
};

export default Team;
