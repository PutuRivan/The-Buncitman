"use client";

import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from "react";

const Promo = () => {
  const [close, setClose] = useState(true);

  useEffect(() => {
    setClose(true); // Ensure the promo is visible on the client side
  }, []);

  const handleClosePromo = () => {
    setClose(false);
  };
  return (
    <>
      {close && (
        <header className="flex justify-center bg-neutral-600">
          <div className="border-x-2 border-t-2 border-black flex flex-row items-center gap-10 py-2 px-10">
            <div className="flex gap-5 items-center">
              <HiOutlineSpeakerphone size={40} />
              <div>
                <h1 className="text-Heading-4 text-blue-500 font-bold">
                  Selamatkan Hari Anda dengan Secangkir Kopi Spesial – Diskon
                  Hingga 50%!
                </h1>
                <p className="text-Heading-5 text-red-800">
                  Segelas Kebaikan untuk Hari yang Lebih Baik - Nikmati Promo
                  Kopi Kami!
                </p>
              </div>
            </div>
            <div className="">
              <button onClick={handleClosePromo}>
                <IoMdClose size={35} color="red" />
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Promo;
