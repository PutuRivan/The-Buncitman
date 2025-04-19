// import { login } from "@/lib/User";
import FormLogin from "@/components/authForm/FormLogin";
import Header from "@/components/Banner/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col gap-3 items-center justify-center my-10">
        <div className="flex flex-col w-[500px] gap-10 items-center justify-center bg-[#F6F6F6] p-5 border-2 border-black rounded-xl">
          <h1 className="text-Heading-1 font-bold">Login</h1>
          <div className="w-96">
            <FormLogin />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
