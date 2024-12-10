"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, X, ArrowRight } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface NavbarProps {
  toggleCart: () => void;
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleCart,
  toggleSearch,
  isSearchOpen,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // New state for scroll effect
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const username = session?.user?.name;

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
      toggleSearch();
      setSearchQuery("");
    }
  };

  const handlesignOut = () => {
    signOut();
    toast({
      title: "Logout",
      description: "You have been successfully logged out.",
      variant: "destructive",
    });
  };

  // ini buat add scroll effect ke navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // bisa Adjust threshold nya
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (isSearchOpen) toggleSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, toggleSearch]);

  return (
    <nav
      className={cn(
        "w-full z-50 flex justify-between items-center px-5 h-[85px] transition-all duration-300",
        isScrolled
          ? "bg-white/90 top-0 fixed shadow-md h-[70px]"
          : "bg-white border-b-2 border-neutral-300"
      )}
    >
      {/* Logo */}
      <div>
        <Image
          src="/The Buncitmen Logo.png"
          alt="Logo"
          width={60} // Adjusted size for scroll effect
          height={60}
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
              <Link href="/shop" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/shop" &&
                      "bg-white text-black border-b-2 border-neutral-300"
                  )}
                >
                  Shop
                </NavigationMenuLink>
              </Link>
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
        style={{ width: "150px" }}
      >
        {/* Search Button with Search Bar */}
        <div
          ref={searchRef}
          className={cn(
            "absolute right-40 flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ease-in-out",
            isSearchOpen
              ? "w-46 px-3 shadow-md border border-neutral-100"
              : "w-8"
          )}
        >
          <Search
            className="text-black cursor-pointer"
            onClick={toggleSearch}
          />
          {isSearchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              className="ml-2 py-2 flex-grow bg-transparent text-sm focus:outline-none"
              placeholder="Search..."
              autoFocus
            />
          )}
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
              {searchQuery.trim() ? (
                <ArrowRight size={14} />
              ) : (
                <X size={20} color="red" />
              )}
            </button>
          )}
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <User />
            </MenubarTrigger>
            {status === "authenticated" ? (
              <MenubarContent>
                <MenubarItem>{username}</MenubarItem>
                <MenubarItem>
                  <Link href={"/checkoutdetails"}>Orders</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Button onClick={handlesignOut}>Logout</Button>
                </MenubarItem>
              </MenubarContent>
            ) : (
              <MenubarContent>
                <MenubarItem>
                  <Link href={"/login"}>Login</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href={"/register"}>Register</Link>
                </MenubarItem>
              </MenubarContent>
            )}
          </MenubarMenu>
        </Menubar>

        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <ShoppingCart />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
