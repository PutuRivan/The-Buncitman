import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section>
        <div className="h-[343] bg-black w-full" />
      </section>

      <section className="flex flex-col gap-3 items-center justify-center my-10">
        <h1 className="text-Heading-1 font-bold">Login</h1>
        <form action="" className="flex flex-col gap-5 w-80">
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="border-2 border-black px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <p className="text-Heading-6">Forgot Password?</p>
          </div>
          <button className="border-2 border-black p-2 rounded-xl hover:text-white hover:bg-neutral-950">
            Login
          </button>
          <div className="place-items-center">
            <p className="text-Heading-6">
              Don&apos;t have account? <Link href="/register" className="font-bold">Sign Up</Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default page;
