import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AddressList from "./AddressList";

const AddressContainer = () => {
  return (
    <section className="px-10 mx-10 bg-white border-2 border-neutral-100 border-hidden">
      <div className="p-5">
        <div className="flex flex-row gap-3 items-center">
          <FaMapMarkerAlt />
          <h1>Alamat Pengiriman</h1>
        </div>
        <div className="flex flex-row gap-5">
          <h1>User A (+62)81234567890</h1>
          <p>
            Green Valley Residence No. 10, DISTRICT 1, CITY CENTER, WEST JAVA,
            ID, 12345
          </p>
          <AddressList />
        </div>
      </div>
    </section>
  );
};

export default AddressContainer;
