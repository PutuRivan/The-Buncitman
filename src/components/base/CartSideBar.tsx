"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteItem, getAllCarts } from "@/lib/action/cart";
import SideBarCart from "../Card/CardSideBar";
import { postAllOrders } from "@/lib/action/orders";

interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface CartSidebarProps {
  isCartOpen: boolean;
  closeCart: () => void;
  items: number[];
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isCartOpen, closeCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [proceedLoading, setProceedLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const username = session?.user?.name;

  useEffect(() => {
    if (!username) {
      toast({
        title: "error",
        description: "Oops you must login",
        variant: "destructive",
      });
      return;
    }
    const data = async () => {
      const response = await getAllCarts({ username });
      setCartItems(response);
    };

    data();
  }, [username, toast]);

  const handleRemoveItem = async (id: string) => {
    const remove = await deleteItem(id);
    if (remove) {
      const DeleteItems = cartItems.filter((item) => item.id !== id);
      setCartItems(DeleteItems);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleProceed = async (username: string, cartItems: CartItem[]) => {
    try {
      setProceedLoading(true);
      const productName = cartItems.map((item) => item.product.id).toString();
      const post = await postAllOrders({
        username,
        productName,
      });

      if (post) {
        toast({
          title: "success",
          description: "Order Placed Successfully",
          variant: "default",
        });
      }
      router.push("/checkoutdetails");

      closeCart();
    } catch (error) {
      console.log(error);
    } finally {
      setProceedLoading(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4 h-[70vh] overflow-y-auto scrollBar px-3">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <SideBarCart
                key={index}
                id={item.id}
                name={item.product.name}
                quantity={item.quantity}
                total={item.product.price * item.quantity}
                imageUrl={item.product.imageUrl}
                handleRemove={() => handleRemoveItem(item.id)}
                handleQuantityChange={handleQuantityChange}
              />
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
          {proceedLoading ? (
            <Button className="w-full mt-4" disabled variant="ghost">
              Loading...
            </Button>
          ) : (
            <Button
              disabled={cartItems.length === 0}
              className="w-full mt-4"
              onClick={() => {
                handleProceed(username as string, cartItems);
              }}
            >
              Proceed to Checkout
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
