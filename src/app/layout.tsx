"use client";

import React, { useState, ReactNode } from "react";
import Navbar from "@/components/Navigation Bar/Navbar";
import "./globals.css";
import Promo from "@/components/Banner/Promo";
import Footer from "@/components/Navigation Bar/Footer";
import CartSidebar from "@/components/Navigation Bar/CartSideBar";
import SearchBar from "@/components/Navigation Bar/SearchBar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchBar, setIsSearchBar] = useState<boolean>(false);

  const toggleCart = (): void => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSearchBar = (): void => {
    setIsSearchBar(!isSearchBar);
  };

  return (
    <html lang="en">
      <head>
        <title>The Buncitman</title>
        <meta name="description" content="Coffe Shop" />
      </head>
      <body className="">
        <Promo />
        <Navbar 
          toggleCart={toggleCart} 
          toggleSearch={toggleSearchBar} 
          isSearchOpen={isSearchBar} 
        />
        <CartSidebar 
          isCartOpen={isCartOpen} 
          closeCart={toggleCart} 
          items={[10]} 
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
