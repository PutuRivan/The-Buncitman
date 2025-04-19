import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <section>
      {/* <div className="bg-black w-full h-[210px]" /> */}
      <Image src="/banner.jpg" alt="Banner" width={500} height={100} className="w-full h-96"/>
    </section>
  );
};

export default Header;
