// import { register } from "@/lib/User";
import FormRegister from "@/components/authForm/FormRegister";
import React from "react";

const page = () => {
  return (
    <>
      <section className="flex flex-col gap-5 items-center justify-center my-10">
        <h1 className="text-Heading-1 tet-red-500 font-bold">Register</h1>
        <div className="w-96">
          <FormRegister />
        </div>
      </section>
    </>
  );
};

export default page;
