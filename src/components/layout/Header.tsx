import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Bell from "../../assets/icons/bell.svg";
import Logo from "../../assets/images/logo.svg";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className="bg-white shadow-sm border-b-1 border-gray-300">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Left side - Logo and menu button */}
        <div className="flex items-center px-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            <img src={Logo} alt="logo-image" />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:block">
          <SearchBar placeholder="Search forms" className="lg:w-[400px]" />
        </div>

        {/* Right side - Search, notifications, and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <img src={Bell} alt="bell" className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
