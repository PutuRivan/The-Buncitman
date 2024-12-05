import { updateOrder } from "@/lib/action/orders";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  imageUrl: string;
  handleRemove: MouseEventHandler<SVGElement>;
  handleQuantityChange: (id: string, newQuantity: number) => void;
}

const Order = ({
  id,
  name,
  price,
  quantity,
  totalAmount,
  imageUrl,
  handleRemove,
  handleQuantityChange,
}: Props) => {
  const [Quantity, setNewQuantity] = useState(quantity);

  const incrementQuantity = () => {
    setNewQuantity(Quantity + 1);
    const newQuantity = Quantity + 1;
    handleUpdate(newQuantity);
    handleQuantityChange(id, newQuantity);
  };

  const decrementQuantity = () => {
    setNewQuantity(Quantity - 1);
    const newQuantity = Quantity - 1;
    handleUpdate(newQuantity);
    handleQuantityChange(id, newQuantity);
  };

  const handleUpdate = async (newQuantity: number) => {
    await updateOrder({ id, quantity: newQuantity });
  };

  useEffect(() => {}, [Quantity]);

  return (
    <tr className="border-b-2 border-neutral-100">
      <td className="px-2">
        <button>
          <FaRegTrashAlt
            size={20}
            className="cursor-pointer text-red-500"
            onClick={handleRemove}
          />
        </button>
      </td>
      <td className="px-4 py-2 ">
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-sm"
            width={80}
            height={80}
          />
        </div>
      </td>
      <td>{name}</td>
      <td className="px-4 py-2">{formatPrice(price)}</td>
      <td className="px-4 py-2">
        <div className="flex justify-center gap-2">
          <button
            className="bg-gray-200 px-2 py-1 rounded-l-md"
            onClick={decrementQuantity}
          >
            -
          </button>
          <span className="bg-gray-100 px-2 py-1 rounded">{Quantity}</span>
          <button
            className="bg-gray-200 px-2 py-1 rounded-r-md"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-4 py-2">{formatPrice(totalAmount)}</td>
    </tr>
  );
};

export default Order;
