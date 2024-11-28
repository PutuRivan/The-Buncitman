"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, X, ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  toggleCart: () => void; // Function to toggle the cart sidebar
  toggleSearch: () => void; // Function to toggle the search bar
  isSearchOpen: boolean; // State for whether the search bar is open
}

const Navbar: React.FC<NavbarProps> = ({
  toggleCart,
  toggleSearch,
  isSearchOpen,
}) => {
  const searchRef = useRef<HTMLDivElement>(null); // Explicitly type the ref
  const pathname = usePathname(); // Get the current route

  const [searchQuery, setSearchQuery] = useState<string>(""); // Add state for search input

  // Function to handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Logic for search action, e.g., navigating to a search page
      console.log("Search submitted:", searchQuery);
      toggleSearch(); // Close the search bar after submission
    }
  };

  // Close the search bar when clicking outside or pressing "Escape"
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (isSearchOpen) toggleSearch(); // Close search bar if open
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        toggleSearch(); // Close search bar if open
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, toggleSearch]);

  return (
    <nav className="flex justify-between items-center px-5 h-[85px] border-t-2 border-neutral-300 bg-white">
      {/* Logo */}
      <div>
        <Image
          src="/The Buncitmen Logo.png"
          alt="Logo"
          width={80}
          height={80}
        />
      </div>

      {/* Combined Navigation */}
      <div className="flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-4">
            {/* Home Link */}
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/" &&
                      "bg-white text-black border-b-2 border-neutral-300"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Shop Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  pathname.includes("/shop") &&
                    "text-black font-bold border-b-2 border-black"
                )}
              >
                Shop
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink
                      href="/shop"
                      className="block p-3 rounded-md hover:bg-gray-100"
                    >
                      Coffee Types
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact Link */}
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/contact" &&
                      "text-black border-b-2 border-neutral-200"
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Action Buttons */}
      <div
        className="flex flex-row items-center gap-4 relative"
        style={{ width: "150px" }} // Fixed width for Action Buttons
      >
        {/* Search Button with Search Bar */}
        <div
          ref={searchRef}
          className={cn(
            "absolute right-40 top-0.8 flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ease-in-out",
            isSearchOpen
              ? "w-46 px-3 shadow-md border border-neutral-100"
              : "w-8"
          )}
        >
          {/* Search Icon (inside the bar) */}
          <Search
            className="text-black cursor-pointer"
            onClick={toggleSearch}
          />
          {/* Search Input */}
          {isSearchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 py-2 flex-grow bg-transparent text-sm focus:outline-none"
              placeholder="Search..."
              autoFocus
            />
          )}

          {/* Close/Submit Button */}
          {isSearchOpen && (
            <button
              className={cn(
                "ml-2 flex items-center justify-center h-5 w-5 rounded-full text-gray-500 transition-all duration-300",
                searchQuery.trim()
                  ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-300"
                  : "hover:bg-gray-200"
              )}
              onClick={searchQuery.trim() ? handleSearchSubmit : toggleSearch}
            >
              {searchQuery.trim() ? <ArrowRight size={14} /> : <X size={20} color="red" />}
            </button>
          )}
        </div>

        {/* User and Cart Buttons */}
        <Button variant="ghost" size="icon">
          <Link href="/login">
            <User />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <ShoppingCart />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
