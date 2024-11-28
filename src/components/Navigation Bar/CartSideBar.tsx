"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartSidebarProps {
  isCartOpen: boolean;
  closeCart: () => void;
  items: number[];
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isCartOpen, closeCart }) => {
  // const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Arabica", quantity: 2, price: 50000 },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
      )
    );
  };

  const handleProceed = () => {
    window.location.reload();
    window.location.href = "/viewcart";
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <Image
                  src="https://via.placeholder.com/50"
                  alt={item.name}
                  className="w-14 h-14 rounded"
                  width={56}
                  height={56}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <p className="mx-2">{item.quantity}</p>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p>Rp {item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p>Rp {calculateTotal()}</p>
          </div>
          <Button
            disabled={cartItems.length === 0}
            className="w-full mt-4"
            onClick={handleProceed}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
