import React, { ReactNode } from "react";

interface Props {
  logo: ReactNode;
  description: string;
  contactInfo: string;
}

const ContactCard = ({ logo, description, contactInfo }: Props) => {
  return (
    <div className="flex flex-col items-center w-96 h-60 gap-5 justify-center">
      {/* <Logo /> */}
      {logo}
      <h1 className="text-lg font-bold">{description}</h1>
      <p className="text-sm">{contactInfo}</p>
    </div>
  );
};

export default ContactCard;
