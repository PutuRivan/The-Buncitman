import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosPerson, IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleCart, toggleSearch }) => {
  return (
    <>
      <nav className="flex flex-row justify-between items-center px-5 h-[85px] border-t-2 border-black bg-neutral-600">
        <div className="">
          <Image
            src="/The Buncitmen Logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-5">
            <Link href="/" className="text-Heading-3">
              Home
            </Link>
            <Link href="/shop" className="text-Heading-3">
              Shop
            </Link>
            <Link href="/contact" className="text-Heading-3">
              Contact
            </Link>
          </div>
          <div className="flex flex-row gap-5">
            <IoIosSearch size={30} onClick={toggleSearch} className="cursor-pointer" />
            <Link href="/login">
              <IoIosPerson size={30} />
            </Link>
            <IoCartOutline
              size={30}
              onClick={toggleCart}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
