import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-row justify-between m-10">
      <div className="flex flex-col gap-2">
        <div className="">
          <h1 className="text-xl font-bold">logo</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Address :</h3>
          <p className="tet-lg">Level 1, 12 sample St, Sydney NSW 2000</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Contact :</h3>
          <p className="text-lg">Phone : 02 1234 5678</p>
          <p className="text-lg">info@relume.io</p>
        </div>
        <div className="flex flex-row gap-3">
          <FaFacebook size={24}/>
          <FaInstagram size={24}/>
          <FaXTwitter size={24}/>
          <FaLinkedin size={24}/>
          <FaYoutube size={24}/>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-md font-bold">About Us</h1>
          <h1 className="text-md font-bold">Our Menu</h1>
          <h1 className="text-md font-bold">Contact Us</h1>
          <h1 className="text-md font-bold">Blog Posts</h1>
          <h1 className="text-md font-bold">Gift Cards</h1>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-md font-bold">FAQ Section</h1>
          <h1 className="text-md font-bold">Store Locator</h1>
          <h1 className="text-md font-bold">Sustainability Efforts</h1>
          <h1 className="text-md font-bold">Careers Page</h1>
          <h1 className="text-md font-bold">Press Releases</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
