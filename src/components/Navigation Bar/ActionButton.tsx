import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { ArrowRight, Search, ShoppingCart, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  toggleCart: () => void; // Function to toggle the cart sidebar
  toggleSearch: () => void; // Function to toggle the search bar
  isSearchOpen: boolean; // State for whether the search bar is open
}
const ActionButton = ({ toggleCart, toggleSearch, isSearchOpen }: Props) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const username = session?.user?.name;

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Logic for search action, e.g., navigating to a search page
      console.log("Search submitted:", searchQuery);
      toggleSearch(); // Close the search bar after submission
    }
  };

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


  const handlesignOut = () => {
    signOut();
    toast({
      title: "error",
      description: "kamu sudah logout",
      variant: "destructive",
    });
  };

  return (
    <div
      className="flex flex-row items-center gap-4 relative"
      style={{ width: "150px" }} // Fixed width for Action Buttons
    >
      {/* Search Button with Search Bar */}
      <div
        ref={searchRef}
        className={cn(
          "absolute right-40 top-0.8 flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ease-in-out",
          isSearchOpen ? "w-46 px-3 shadow-md border border-neutral-100" : "w-8"
        )}
      >
        {/* Search Icon (inside the bar) */}
        <Search className="text-black cursor-pointer" onClick={toggleSearch} />
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
              <MenubarItem>Profile</MenubarItem>
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
  );
};

export default ActionButton;
