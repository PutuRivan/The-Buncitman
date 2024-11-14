"use client";

import Navbar from "@/components/Navigation Bar/Navbar";
import "./globals.css";
import Promo from "@/components/Banner/Promo";
import Footer from "@/components/Navigation Bar/Footer";
import CartSidebar from "@/components/Navigation Bar/CartSidebar";
import { useState } from "react";
import SearchBar from "@/components/Navigation Bar/SearchBar";

export default function RootLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchBar, setisSearchBar] = useState(false);

  const toogleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const searchBar = () => {
    setisSearchBar(!isSearchBar);
  };
  return (
    <html lang="en">
      <head>
        <title>The Buncitman</title>
        <meta name="description" content="Coffe Shop" />
      </head>
      <body className={``}>
        <Promo />
        <Navbar toggleCart={toogleCart} toggleSearch={searchBar}/>
        <SearchBar isOpen={isSearchBar} />
        <CartSidebar isOpen={isCartOpen} closeCart={toogleCart} items={[]} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
