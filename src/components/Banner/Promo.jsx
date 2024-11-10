import React from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Promo = () => {
  return (
    <header className="flex justify-center">
      <div className="border-2 border-black flex flex-row items-center gap-10 py-2 px-20">
        <div className="flex gap-5 items-center">
          <HiOutlineSpeakerphone size={40} />
          <div>
            <h1 className="text-2xl font-bold">
              Selamatkan Hari Anda dengan Secangkir Kopi Spesial – Diskon Hingga
              50%!
            </h1>
            <p className="text-xl">
              Segelas Kebaikan untuk Hari yang Lebih Baik - Nikmati Promo Kopi
              Kami!
            </p>
          </div>
        </div>
        <div className="">
          <IoMdClose size={35} />
        </div>
      </div>
    </header>
  );
};

export default Promo;
