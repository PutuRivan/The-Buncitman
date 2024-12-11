import { Address } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

interface AddressCard {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  setIsAddingNew: Dispatch<SetStateAction<boolean>>;
  item: Address;
  handleDeleteAddress: (index: string) => void;
}

const AddressCard = ({
  selectedAddress,
  setSelectedAddress,
  setIsAddingNew,
  item,
  handleDeleteAddress,
}: AddressCard) => {
  
  return (
    <div
      className={`flex justify-between items-center p-3 border rounded-md ${
        selectedAddress === item ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div>
        <input
          type="radio"
          name="address"
          value={item.user.name}
          checked={selectedAddress === item}
          onChange={() => setSelectedAddress(item)}
        />
        <span className="ml-2 font-semibold">{item.user.name}</span>
        <p className="text-sm text-neutral-600">{item.user.name}</p>
        <p className="text-sm text-neutral-600">{item.street}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleDeleteAddress(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
        <button
          onClick={() => {
            setIsAddingNew(true);
          }}
          className="text-blue-500 hover:font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
