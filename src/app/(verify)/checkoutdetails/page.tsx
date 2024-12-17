"use client";

import { formatPrice } from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
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
import { GoArrowLeft } from "react-icons/go";

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
  const router = useRouter();
  const [backLoading, setBackLoading] = useState(false); // State for "Back" button loading
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [addLocationLoading, setAddLocationLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [saveAddressLoading, setSaveAddressLoading] = useState(false);
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

  // Handle Add New Location with Loading
  const handleAddNewLocation = async () => {
    setAddLocationLoading(true);
    setTimeout(() => {
      setIsAddingNew(true);
      setAddLocationLoading(false);
    }, 1000);
  };

  // Handle Confirm Button with Loading
  const handleConfirmAddress = async () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setDialogOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  // Handle Save Address with Loading
  const handleSaveAddress = async () => {
    setSaveAddressLoading(true);
    await handleAddAddress();
    setSaveAddressLoading(false);
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

  const handleBack = () => {
    setBackLoading(true);
    setTimeout(() => {
      router.push("/shop");
      setBackLoading(false);
    }, 1000); // Simulated loading time for navigation (intinya sim load time nya lah)
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
                      handleSaveAddress();
                      handleAddAddress();
                      setDialogOpen(false); // Close the dialog
                    }}
                    className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 flex justify-center items-center gap-2"
                  >
                    {saveAddressLoading ? (
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      "Save"
                    )}
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
                        className="text-primary-700 hover:font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleAddNewLocation();
                    setIsAddingNew(true);
                  }}
                  className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-600 flex justify-center items-center gap-2"
                >
                  {addLocationLoading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Add New Location"
                  )}
                </button>
              </div>
            )}
            {!isAddingNew && (
              <button
                onClick={() => {
                  handleConfirmAddress();
                  setDialogOpen(false); // Close the dialog
                }}
                className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-600 flex justify-center items-center gap-2"
              >
                {confirmLoading ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  "Confirm"
                )}
              </button>
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
            {/* Back Button */}
            <div className="p-2 mt-0 ml-80 pl-64">
              <Button
                onClick={handleBack}
                disabled={backLoading}
                className="px-4 py-2 mb-2 bg-neutral-800 hover:bg-gray-300"
              >
                <GoArrowLeft />
                {backLoading ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                ) : (
                  "Mau Nambah ?"
                )}
              </Button>
            </div>
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
          <h2 className="text-lg text-primary-500 font-semibold text-center mb-4">
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
          <Button
            onClick={() =>
              handleCheckout(username as string, email as string, total, {
                Orders: orders,
              })
            }
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 flex justify-center items-center gap-2"
            disabled={loadingCheckout}
          >
            {loadingCheckout ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Checkout"
            )}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Page;
