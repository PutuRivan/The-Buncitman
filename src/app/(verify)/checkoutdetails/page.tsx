"use client";

import { formatPrice } from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { deleteItem, deleteOrders, getAllOrders } from "@/lib/action/orders";
import Order from "@/components/Card/Order";
import { createInvoice } from "@/lib/action/transaction";
import { Address } from "@/types";
import {
  deleteAddress,
  getAddresses,
  postAddress,
} from "@/lib/action/addresses";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

interface checkoutOptions {
  Orders: Order[];
}

const Page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("Go Send");
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const username = session?.user?.name;
  const email = session?.user?.email;

  useEffect(() => {
    if (!username) {
      toast({
        title: "error",
        description: "Oops you must login",
        variant: "destructive",
      });
      return;
    }
    const fetch = async () => {
      const response = await getAllOrders({ username });
      const responseAddress = await getAddresses(username);
      setAddresses(responseAddress);
      setOrders(response);
      setSelectedAddress(responseAddress[0]);
    };
    fetch();
  }, [username, toast]);

  const calculateSubtotal = () =>
    orders.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  // Calculate Prices
  const shippingFee = selectedShipping === "JNE" ? 15000 : 25000;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  // Address Handler
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, totalAmount: item.quantity * item.product.price }
          : item
      )
    );
  };

  const handleRemove = async (id: string) => {
    const remove = await deleteItem({ id });
    if (remove) {
      const DeleteItems = orders.filter((item) => item.id !== id);
      setOrders(DeleteItems);
    }
  };

  const handleDeleteAddress = async (index: string) => {
    console.log("delete address", index);
    const response = await deleteAddress(index);
    console.log(response);
  };

  const handleCheckout = async (
    username: string,
    email: string,
    total: number,
    options: checkoutOptions
  ) => {
    try {
      setLoadingCheckout(true);
      if (selectedAddress === undefined) {
        toast({
          title: "Error",
          description: "Please select an address",
          variant: "destructive",
        });
        return;
      }

      const result = await createInvoice({
        orders: options.Orders,
        total,
        email,
        username,
        selectedShipping,
        shippingFee,
        Addresses: [selectedAddress],
      });
      // Redirect jika berhasil
      if (result.invoice_url) {
        window.location.href = result.invoice_url;
        await deleteOrders(username);
      } else {
        console.error("Invoice URL not found", result);
      }
    } catch (error) {
      console.error("Checkout Error", error);
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleAddAddress = async () => {
    if (!username) return;
    const response = await postAddress({ username, ...newAddress });
    if (response) setIsAddingNew(false);
  };

  return (
    <main className="flex flex-col my-10 px-4 sm:px-10">
      {/* Address Section */}
      <section className="bg-white border border-neutral-100 rounded-lg shadow-sm p-5 mb-6">
        <div className="font-bold text-neutral-500 flex items-center gap-3 mb-3">
          <h1>ALAMAT PENGIRIMAN</h1>
        </div>
        {selectedAddress && (
          <>
            <div className="flex items-center gap-1 font-semibold text-neutral-900 pb-3">
              <FaMapMarkerAlt size={17} />
              <h2>{selectedAddress.name}</h2>
              <TbPointFilled size={12} />
              <h2>{selectedAddress.phone}</h2>
            </div>
            <div className="text-neutral-700 flex justify-between items-center">
              <h3>
                {selectedAddress.street}, {selectedAddress.city},{" "}
                {selectedAddress.state}, {selectedAddress.country},{" "}
                {selectedAddress.postalCode}{" "}
              </h3>
            </div>
          </>
        )}
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
              <form className="space-y-3">
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
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
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
                      <p className="text-sm text-neutral-600">{addr.city}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
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
      </section>

      {/* Main Content */}
      <section className="flex flex-col lg:flex-row gap-5">
        {/* Product List */}
        <div className="lg:w-3/4 bg-white border border-neutral-100 rounded-lg shadow-sm p-5">
          <div className="font-bold text-neutral-500 flex items-center gap-3 mb-5">
            <h1>Lihat dulu pesananmu :</h1>
          </div>
          <div className="overflow-y-auto h-96">
            <table className="w-full">
              <thead>
                <tr className="text-left text-neutral-600">
                  <th></th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <Order
                    key={index}
                    id={item.id}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                    totalAmount={item.totalAmount}
                    imageUrl={item.product.imageUrl}
                    handleRemove={(e) => {
                      e.preventDefault();
                      handleRemove(item.id);
                    }}
                    handleQuantityChange={handleQuantityChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:w-1/3 bg-white border border-neutral-100 rounded-lg shadow-sm p-5">
          <h2 className="text-lg text-blue-500 font-semibold text-center mb-4">
            Delivery Details
          </h2>

          {/* Shipping Options */}
          <h3 className="font-semibold mb-2">Shipping Options</h3>
          <div className="flex flex-col gap-2">
            {["Go Send", "JNE"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={option}
                  checked={selectedShipping === option}
                  onChange={() => {
                    setSelectedShipping(option);
                  }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Summary Details */}
          <div className="mt-6 text-neutral-700">
            <div className="flex justify-between">
              <h4>Subtotal Produk:</h4>
              <p>{formatPrice(calculateSubtotal())}</p>
            </div>
            <div className="flex justify-between">
              <h4>Subtotal Pengiriman:</h4>
              <p>{formatPrice(shippingFee)}</p>
            </div>
            <div className="flex justify-between font-semibold text-neutral-900 mt-4">
              <h4>Total:</h4>
              <p>{formatPrice(total)}</p>
            </div>
          </div>

          {/* Buat Checkout Button */}
          {loadingCheckout ? (
            <Button className="w-full mt-4" disabled variant="ghost">
              Loading...
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white w-full py-2 mt-4 rounded-md hover:bg-blue-600"
              onClick={() =>
                handleCheckout(username as string, email as string, total, {
                  Orders: orders,
                })
              }
              aria-label="Proceed to checkout"
            >
              Checkout
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
