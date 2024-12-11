import { postAddress } from "@/lib/action/addresses";
import React, { useState } from "react";

interface AddressFormProps {
  setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | undefined;
}

const AddressForm = ({
  setIsAddingNew,
  setDialogOpen,
  username,
}: AddressFormProps) => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleAddAddress = async () => {
    if (!username) return;
    const response = await postAddress({ username, ...newAddress });
    if (response) setIsAddingNew(false);
  };
  return (
    <form className="space-y-3">
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
      <input
        type="text"
        placeholder="Street"
        value={newAddress.street}
        onChange={(e) =>
          setNewAddress({ ...newAddress, street: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="City"
        value={newAddress.city}
        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="State"
        value={newAddress.state}
        onChange={(e) =>
          setNewAddress({ ...newAddress, state: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChange={(e) =>
          setNewAddress({ ...newAddress, postalCode: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Country"
        value={newAddress.country}
        onChange={(e) =>
          setNewAddress({ ...newAddress, country: e.target.value })
        }
        className="w-full border border-gray-300 p-2 rounded-md"
      />

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
    </form>
  );
};

export default AddressForm;
