import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
    isCartOpen : boolean;
    closeCart : MouseEventHandler<HTMLButtonElement>;

}

const CartSidebar = ({ isCartOpen, closeCart } : Props) => {
  const router = useRouter();
  const indexs = 1;

//   const handleRemoveItem = (indexs : string) => {
//     // Add logic to remove item from cart
//     console.log(indexs)
//   };

  return (
    <>
      {isCartOpen && (
        <div
          className={`fixed top-0 right-[0] w-[300px] h-full bg-gray-100 shadow-lg overflow-y-auto transition-right duration-300 ease-in-out p-5 z-50`}
        >
          <button
            className="absolute top-3 right-[3.75px] text-2xl border-none bg-transparent cursor-pointer"
            onClick={closeCart}
          >
            <IoMdClose size={35} color="red" />
          </button>
          <h2 className="text-center text-Heading-3">Your Cart</h2>
          <div className="">
            {indexs > 0 ? (
              Array(indexs)
                .fill(2)
                .map((item, index) => (
                  <div
                    className="flex justify-between mt-5 items-center py-5 border-y-2 border-black"
                    key={index}
                  >
                    <img
                      src="https://res.cloudinary.com/dadbyegpl/image/upload/v1731460310/TheBuncitman/lsryvdej6vnboy7y83f5.jpg"
                      alt="product"
                      className="w-14 h-14 rounded"
                    />
                    <p>Arabica <span>(2)</span></p>
                    <p>Rp 50000</p>
                    <button
                      className="ml-2 tet-red-500-600 border-none bg-transparent cursor-pointer"
                    //   onClick={() => handleRemoveItem(index)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-Heading-3 text-center">Your cart is empty</p>
            )}
          </div>

          <button
            className="w-full mt-2.5 py-2.5 bg-blue-600 text-white border-none cursor-pointer"
            onClick={() => router.push("/viewcart")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  );
};



export default CartSidebar;
