import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const AddressContainer = () => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [addresses, setAddresses] = useState([
    {
      name: "User A",
      phone: "(+62)812345678",
      address:
        "Pokoknya Rumah",
    },
    {
      name: "Ammar Allezandro",
      phone: "(+62)8751702205",
      address: "Jl. Kemiri Jaya, Kota Depok, Jawa Barat, ID 16421",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const handleAddAddress = () => {
    setAddresses((prev) => [...prev, newAddress]);
    setNewAddress({ name: "", phone: "", address: "" });
    setIsAddingNew(false);
  };
  const handleDeleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };
  return (
    <section className="bg-white border border-neutral-100 rounded-lg shadow-sm p-5 mb-6">
      <div className="font-bold text-neutral-500 flex items-center gap-3 mb-3">
        <h1>ALAMAT PENGIRIMAN</h1>
      </div>
      <div className="flex items-center gap-1 font-semibold text-neutral-900 pb-3">
        <FaMapMarkerAlt size={17} />
        <h2>{selectedAddress.name}</h2>
        <TbPointFilled size={12} />
        <h2>{selectedAddress.phone}</h2>
      </div>
      <div className="text-neutral-700 flex justify-between items-center">
        <h3>{selectedAddress.address}</h3>
        <Dialog
          open={isAddingNew || dialogOpen}
          onOpenChange={(open) => setDialogOpen(open)}
        >
          <DialogTrigger asChild>
            <button className="text-blue-500 hover:font-medium">Ubah</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isAddingNew ? "Add New Address" : "Select Address"}
              </DialogTitle>
            </DialogHeader>
            {isAddingNew ? (
              // Add New Address Form
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
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
            ) : (
              // Address List View
              <div className="space-y-3">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 border rounded-md ${
                      selectedAddress === addr
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <div>
                      <input
                        type="radio"
                        name="address"
                        value={addr.name}
                        checked={selectedAddress === addr}
                        onChange={() => setSelectedAddress(addr)}
                      />
                      <span className="ml-2 font-semibold">{addr.name}</span>
                      <p className="text-sm text-neutral-600">{addr.phone}</p>
                      <p className="text-sm text-neutral-600">{addr.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteAddress(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          setNewAddress(addr);
                          setIsAddingNew(true);
                        }}
                        className="text-blue-500 hover:font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Add New Location
                </button>
              </div>
            )}
            {!isAddingNew && (
              <DialogFooter>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Confirm
                </button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AddressContainer;
