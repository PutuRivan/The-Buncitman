import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,   
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-row justify-between p-20 bg-[#F6F6F6] border-t-2 border-neutral-100">
      <div className="flex flex-col gap-2">
        <div className="">
          <Image
            src="/The Buncitmen Logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-Heading-4 font-bold">Address :</h3>
          <p className="text-Heading-5">
            Level 1, 12 sample St, Sydney NSW 2000
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-Heading-4 font-bold">Contact :</h3>
          <p className="text-Heading-5">Phone : 02 1234 5678</p>
          <p className="text-Heading-5">info@relume.io</p>
        </div>
        <div className="flex flex-row gap-3">
          <Link href="https://www.instagram.com/thebuncitmen/" target="_blank">
            <FaInstagram size={20} />
          </Link>

          <Link
            href="https://web.facebook.com/thebuncitmencoffeeroastery/?locale=id_ID&_rdc=1&_rdr#"
            target="_blank"
          >
            <FaFacebook size={20} />
          </Link>
          <Link href="https://x.com/thebuncitmen" target="_blank">
            <FaXTwitter size={20} />
          </Link>

          <Link
            href="https://www.youtube.com/channel/UC1UhwOULw-f33ijnf9eC6rw"
            target="_blank"
          >
            <FaYoutube size={20} />
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-Heading-4 font-semibold">
            About Us
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Our Menu
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Contact Us
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Blog Posts
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Gift Cards
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-Heading-4 font-semibold">
            FAQ Section
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Store Locator
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Sustainability Efforts
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Careers Page
          </h1>
          <h1 className="text-Heading-4 font-semibold">
            Press Releases
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
