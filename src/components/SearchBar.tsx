import React from "react";
import { searchIcon } from "../assets/icons/icons";
import type { SearchBarProps } from "../types";

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className = "w-64",
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className={`pl-4 pr-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 ${className}`}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <img src={searchIcon} alt="search" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
