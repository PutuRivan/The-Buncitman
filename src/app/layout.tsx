"use client";

import Navbar from "@/components/Navigation Bar/Navbar";
import "./globals.css";
import { useState } from "react";
import Promo from "@/components/Banner/Promo";
import Footer from "@/components/Navigation Bar/Footer";
import CartSidebar from "@/components/Navigation Bar/CartSideBar";
import SearchBar from "@/components/Navigation Bar/SearchBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <nav>
          <Navbar
            toggleCart={toogleCart}
            toggleSearch={searchBar}
            isSearchOpen={isSearchBar}
          />
          <SearchBar isOpen={isSearchBar} />
          <CartSidebar isCartOpen={isCartOpen} closeCart={toogleCart} />
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
