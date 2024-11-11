import React from "react";

const Contact = (props) => {
  return (
    <div className="flex flex-col items-center w-96 h-60 gap-5 justify-center">
      {props.logo}
      <h1>{props.desc}</h1>
      <p>{props.contact}</p>
    </div>
  );
};

export default Contact;
