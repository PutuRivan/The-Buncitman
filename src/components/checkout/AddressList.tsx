import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FormAddress from "../form/FormAddress";

const AddressList = () => {
  const [selectedAddress, setSelectedAddress] = useState("Putu Rivan");

  const addresses = [
    {
      id: "User A",
      name: "User A",
      phone: "+62 812 3456 7890",
      address:
        "Green Valley Residence No. 10, DISTRICT 1, CITY CENTER, WEST JAVA, ID, 12345",
      labels: ["Primary", "Store Address", "Return Address"],
    },
    {
      id: "User B",
      name: "User B",
      phone: "+62 857 9876 5432",
      address:
        "Central Avenue, No. 20, DISTRICT 2, CITY CENTER, EAST JAVA, ID, 67890",
      labels: [],
    },
  ];
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Ubah</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alamat Saya</DialogTitle>
        </DialogHeader>
        <div>
          {addresses.map((item) => (
            <div
              key={item.id}
              className={`flex items-start p-4 border rounded-lg mb-2 ${
                selectedAddress === item.id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address"
                value={item.id}
                checked={selectedAddress === item.id}
                onChange={() => setSelectedAddress(item.id)}
                className="mt-1 mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{item.name}</h3>
                  <button className="text-blue-500 text-sm">Ubah</button>
                </div>
                <p className="text-sm text-gray-600">{item.phone}</p>
                <p className="text-sm text-gray-600">{item.address}</p>
                <div className="mt-2 space-x-2">
                  {item.labels.map((label, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* <button className="mt-4 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg w-full text-sm">
            + Tambah Alamat Baru
          </button> */}
          <FormAddress />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressList;
