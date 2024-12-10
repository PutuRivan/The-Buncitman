import React, { useEffect, useState } from "react";
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
import { getAddresses } from "@/lib/action/addresses";
import { useSession } from "next-auth/react";
import AddressForm from "./AddressForm";
import { Address } from "@/types";
import AddressCard from "../Card/AddressCard";

const AddressContainer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { data: session } = useSession();
  const username = session?.user?.name;

  useEffect(() => {
    if (!username) return;

    const fetchAddresses = async () => {
      const response = await getAddresses(username);
      setAddresses(response);
      if (response.length > 0) {
        setSelectedAddress(response[0]); // Set address pertama sebagai default
      }
    };
    fetchAddresses();
  }, [username]);

  const handleAddAddress = () => {
    console.log("add new Address");
  };
  const handleDeleteAddress = (index: number) => {
    console.log("delete address", index);
    // setAddresses(addresses.filter((_, i) => i !== index));
  };

  if (!selectedAddress) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white border border-neutral-100 rounded-lg shadow-sm p-5 mb-6">
      <div className="font-bold text-neutral-500 flex items-center gap-3 mb-3">
        <h1>ALAMAT PENGIRIMAN</h1>
      </div>
      <div className="flex items-center gap-1 font-semibold text-neutral-900 pb-3">
        <FaMapMarkerAlt size={17} />
        <h2>{selectedAddress.user.name}</h2>
        <TbPointFilled size={12} />
        <h2>{selectedAddress.user.name}</h2>
      </div>
      <div className="text-neutral-700 flex justify-between items-center">
        <h3>
          {selectedAddress.street}, {selectedAddress.city},{" "}
          {selectedAddress.state}, {selectedAddress.country},{" "}
          {selectedAddress.postalCode}{" "}
        </h3>
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
              <AddressForm
                setIsAddingNew={setIsAddingNew}
                setDialogOpen={setDialogOpen}
                handleAddAddress={handleAddAddress}
              />
            ) : (
              // Address List View
              <div className="space-y-3">
                {addresses.map((addr, index) => (
                  <AddressCard
                    key={index}
                    item={addr}
                    setSelectedAddress={setSelectedAddress}
                    setIsAddingNew={setIsAddingNew}
                    handleDeleteAddress={() => handleDeleteAddress(index)}
                    selectedAddress={null}
                  />
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
