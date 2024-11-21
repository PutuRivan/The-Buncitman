import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";

interface Props {
  toggleCart: MouseEventHandler<SVGElement>;
  toggleSearch: MouseEventHandler<SVGElement>;
  isSearchOpen: boolean;
}

const Navbar = ({ toggleCart, toggleSearch, isSearchOpen }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-5 h-[85px] border-t-2 border-black bg-neutral-600">
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
            <Link href="/" className="text-Heading-4">
              Home
            </Link>
            <Link href="/shop" className="text-Heading-4">
              Shop
            </Link>
            <Link href="/contact" className="text-Heading-4">
              Contact
            </Link>
          </div>
          <div className="flex flex-row gap-5">
            {isSearchOpen ? (
              <IoMdClose
                size={30}
                color="red"
                onClick={toggleSearch}
                className="cursor-pointer"
              />
            ) : (
              <IoIosSearch
                size={30}
                onClick={toggleSearch}
                className="cursor-pointer"
              />
            )}

            <Link href="/login">
              <IoPersonOutline size={30} />
            </Link>
            <IoCartOutline
              size={30}
              onClick={toggleCart}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
