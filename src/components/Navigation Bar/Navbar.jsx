import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosCart, IoIosPerson, IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center px-5 h-[85px]">
      <div className="">Logo</div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-5">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex flex-row gap-5">
          <IoIosSearch size={24} />
          <IoIosPerson size={24} />
          <IoIosCart size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
