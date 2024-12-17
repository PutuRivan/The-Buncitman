"use client";

import React, { useEffect, useState } from "react";
import Team from "@/components/Card/Team";
import Testimonial from "@/components/Card/Testimonial";
import { team } from "@/data/team";
import { Testimoni } from "@/data/testimonial";
import Image from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import HomeSL from "@/components/LoadAnimation/HomeSL";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <HomeSL />
  ) : (
    <>
      {/* Hero Section */}
      <section className="bg-hero-image bg-cover bg-center h-screen flex relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="flex flex-col text-white w-[40rem] h-full justify-center mx-24 gap-5 relative z-10">
          <h1 className="text-Heading-1 font-bold">The Buncitmen</h1>
          <p className="text-Heading-3 font-semibold text-neutral-50">
            The Buncitmen adalah warung kopi yang mengusung konsep modern namun
            masih mempertahankan kesan warung kopi pada umumnya. Warung kopi ini
            menyediakan biji perkopian dan minuman dalam kemasan botol,
            menjadikannya pilihan menarik bagi para penikmat kopi
          </p>
        </div>
      </section>

      {/* Coffee Bean Section */}
      <section className="grid grid-cols-2 gap-5 m-20">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-Heading-2 font-bold">
            Discover Our Premium Coffee Bean Selection
          </h1>
          <p className="text-Heading-4 font-normal">
            Experience the rich flavors of our carefully sourced coffee beans.
            Each variety is crafted to elevate your coffee experience.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-Heading-3 font-semibold">Biji Kopi</h2>
              <p className="text-Heading-4 font-normal text-justify">
                Biji kopi yang The Buncitmen tawarkan memiliki kualitas dan
                kenikmatan yang tidak bisa diragukan, sehingga menghasilkan cita
                rasa yang sesuai dengan selera.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-Heading-3 font-semibold">Produk Kopi</h2>
              <p className="text-Heading-4 font-normal">
                Produk kopi yang kami tawarkan dikemas menjadi minuman botol
                agar lebih praktis dan lebih mudah untuk dinikmati kapanpun
                dimanapun, serta pilihan rasa yang beragam.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center mt-5">
            <Link
              href="/shop"
              className="px-4 py-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-primary-600 hover:underline"
            >
              Contact Us <RxCaretRight size={20} />
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/CoffeImage.jpg"
            alt="Biji kopi"
            width={800}
            height={800}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
      <section className="flex flex-col gap-10 px-20 py-16 bg-neutral-50">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-Heading-2 font-bold text-neutral-900">
            Customer Testimonials
          </h1>
          <p className="text-Heading-4 font-medium text-neutral-700">
            Our customers love our coffee and service!
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Testimoni.map((item) => (
              <Testimonial
                key={item.id}
                name={item.name}
                deskripsi={item.deskripsi}
                image={item.image}
                className="hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-16 px-20 py-16 bg-white">
        <div className="flex flex-col gap-5 items-center">
          <h3 className="font-bold text-Heading-4 text-primary-600">Meet</h3>
          <h1 className="font-bold text-Heading-2 text-neutral-900">
            Our Team
          </h1>
          <p className="text-Heading-4 font-medium text-neutral-700">
            Dedicated professionals passionate about coffee and community.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((item) => (
              <Team
                key={item.id}
                name={item.name}
                position={item.position}
                image={item.image}
                className="hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 mt-10">
          <h1 className="text-Heading-2 font-bold text-neutral-900">
            We&apos;re Hiring!
          </h1>
          <p className="text-Heading-4 font-medium text-neutral-700">
            Join our team and share your passion for coffee.
          </p>
          <button className="rounded-md px-6 py-3 border-2 border-neutral-800 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-colors">
            Open Positions
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
