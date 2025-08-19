import React, { useState, useEffect, useCallback } from "react";
import { searchIcon } from "../assets/icons/icons";
import type { SearchBarProps } from "../types";

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className = "w-64",
  onSearch,
  debounceMs = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search effect
  useEffect(() => {
    if (!onSearch) return;

    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={`pl-4 pr-4 py-2 border bg-[var(--color-black-100)] border-[var(--color-black-300)] rounded-lg focus:ring-2 placeholder:text-[var(--color-black-500)] focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] text-[var(--color-black-900)] ${className}`}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <img src={searchIcon} alt="search" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
