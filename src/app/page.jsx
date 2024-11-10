import Team from "@/components/Card/Team";
import Testimonial from "@/components/Card/Testimonial";
import Image from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";

const Home = () => {
  return (
    <>
      <section className="bg-hero-image bg-cover bg-center h-screen flex">
        <div className="flex flex-col text-black w-[35rem] h-full justify-center mx-14">
          <h1 className="text-5xl font-bold">
            Medium length hero headline goes here
          </h1>
          <p className="text-3xl font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-5 m-20">
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">
              Discover Our Premium Coffee Bean Selection
            </h1>
            <p className="text-3xl font-semibold">
              Experience the rich flavors of our carefully sourced coffee beans.
              Each variety is crafted to elevate your coffee experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold">Subheading one</h2>
              <p className="text-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold">Subheading two</h2>
              <p className="text-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center">
            <Link href="/shop" className="text-lg">
              Shop
            </Link>
            <Link
              href="/shop"
              className="flex flex-row justify-center items-center text-lg"
            >
              <div>Details</div>
              <div>
                <RxCaretRight size={30} />
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          <Image
            src="/CoffeImage.jpg"
            alt="Biji kopi"
            width={800}
            height={800}
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-5xl font-bold">Customer Testimonials</h1>
          <p className="text-3xl font bold">
            Our Customers love our coffe and service!
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-20">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 m-20">
        <div className="flex flex-col gap-5 items-center">
          <h3 className="font-bold text-xl">Meet</h3>
          <h1 className="font-bold text-5xl">Our Team</h1>
          <p>Dedicated professionals passionate about coffe and community</p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-20">
            <Team />
            <Team />
            <Team />
            <Team />
            <Team />
            <Team />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mt-5">
          <h1 className="text-2xl font-bold">We&apos;re hiring!</h1>
          <p className="text-xl font-semibold">Join our team and share your passion for coffee</p>
          <button className="rounded-md p-2 border-black border-2 text-lg">Open Positions</button>
        </div>
      </section>
    </>
  );
};

export default Home;
