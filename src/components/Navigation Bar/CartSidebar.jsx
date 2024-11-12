import React, { useState } from "react";
import "./sidebar.css";

const CartSidebar = ({ isOpen, closeCart, items }) => {
  return (
    <>
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeCart}>
          &times;
        </button>
        <h2>Your Cart</h2>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="cart-item" key={index}>
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </>
  );
};

export default CartSidebar;
