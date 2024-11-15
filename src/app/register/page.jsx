import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section>
        <div className="h-[343] bg-black w-full" />
      </section>

      <section className="flex flex-col gap-5 items-center justify-center my-10">
        <h1 className="text-Heading-1 tet-red-500 font-bold">Register</h1>
        <form action="" className="flex flex-col gap-5 w-80">
          <div className="flex flex-col">
            <label htmlFor="">Create Username</label>
            <input
              type="text"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Create Password</label>
            <input
              type="password"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <button className="border-2 border-black p-2 rounded-xl hover:text-white hover:bg-neutral-950">
            Register
          </button>
          <div className="place-items-center">
            <p className="text-Heading-6 text-green-800">
              Have an Account? <Link href="/login">Login</Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default page;
