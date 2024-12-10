import React, { useState } from "react";

interface AddressFormProps {
  setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddAddress: () => void;
}

const AddressForm = ({
  setIsAddingNew,
  setDialogOpen,
  handleAddAddress,
}: AddressFormProps) => {
  
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Name"
        value={newAddress.name}
        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={newAddress.phone}
        onChange={(e) =>
          setNewAddress({ ...newAddress, phone: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <textarea
        placeholder="Address"
        value={newAddress.address}
        onChange={(e) =>
          setNewAddress({ ...newAddress, address: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      ></textarea>
      <div className="flex gap-2">
        <button
          onClick={() => setIsAddingNew(false)}
          className="w-full bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={() => {
            handleAddAddress();
            setDialogOpen(false); // Close the dialog
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
