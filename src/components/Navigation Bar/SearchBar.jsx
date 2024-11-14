import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({isOpen}) => {
  return (
    <>
      {isOpen && (<div className="flex justify-end w-full px-20 z-50">
        <div className="fixed">
          <input
            type="text"
            placeholder="Cari..."
            className="border-2 border-black p-2 w-60"
          />
          <IoIosSearch size={30} className="absolute top-1 right-2" />
        </div>
      </div>)}  
    </>
    
  );
};

export default SearchBar;
