// import { login } from "@/lib/User";
import FormLogin from "@/components/form/FormLogin";
import React from "react";

const page = () => {
  return (
    <>
      {/* <section>
        <div className="h-[343] bg-black w-full" />
      </section> */}
      <section className="flex flex-col gap-3 items-center justify-center my-10">
        <h1 className="text-Heading-1 font-bold">Login</h1>
        <div className="w-96">
          <FormLogin />
        </div>
      </section>
    </>
  );
};

export default page;
