import { updateItem } from "@/lib/action/cart";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  total: number;
  handleRemove: MouseEventHandler<SVGElement>;
  handleQuantityChange: (id: string, newQuantity: number) => void;
}

const SideBarCart = ({
  id,
  imageUrl,
  name,
  quantity,
  total,
  handleRemove,
  handleQuantityChange,
}: Props) => {
  const [Quantity, setQuantity] = useState(quantity);

  const handlePlus = () => {
    setQuantity(Quantity + 1);
    const temp = Quantity + 1;
    handleUpdate(temp);
    handleQuantityChange(id, temp);
  };

  const handleMinus = () => {
    if (Quantity <= 1) return;
    setQuantity(Quantity - 1);
    const temp = Quantity - 1;
    handleUpdate(temp);
    handleQuantityChange(id, temp);
  };

  const handleUpdate = async (temp: number) => {
    await updateItem({ id, quantity: temp });
  };

  useEffect(() => {}, [Quantity]);

  return (
    <div className="flex items-center justify-between border-b pb-3">
      <Image
        src={imageUrl}
        alt={name}
        className="w-14 h-14 rounded"
        width={56}
        height={56}
      />
      <div>
        <p className="font-medium">{name}</p>
        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleMinus}
          >
            -
          </button>
          <p className="mx-2">{Quantity}</p>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handlePlus}
          >
            +
          </button>
        </div>
      </div>
      <p>Rp {total}</p>
      <button className="text-red-500">
        <FaRegTrashAlt onClick={handleRemove} />
      </button>
    </div>
  );
};

export default SideBarCart;
