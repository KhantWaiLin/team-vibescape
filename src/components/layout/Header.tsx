import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Bell from "../../assets/icons/bell.svg";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Get user's first letter for avatar
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-[var(--color-light-card)] shadow-sm border-b-1 border-[var(--color-light-border)]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-md text-[var(--color-black-500)] hover:text-[var(--color-black-700)] hover:bg-[var(--color-black-100)]"
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
          <Link to="/" className="text-xl font-bold text-[var(--color-black-900)]">
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
          <button className="relative p-2 text-[var(--color-black-500)] hover:text-[var(--color-black-700)] hover:bg-[var(--color-black-100)] rounded-lg">
            <img src={Bell} alt="bell" className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[var(--color-black-100)] transition-colors"
            >
              <div className="w-8 h-8 bg-[var(--color-green-600)] rounded-full flex items-center justify-center">
                <span className="text-[var(--color-light-text-inverse)] text-sm font-medium">
                  {getUserInitial()}
                </span>
              </div>
            </button>

            {/* User Popup Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[var(--color-light-border)] z-50">
                {/* User Info Section */}
                <div className="p-4 border-b border-[var(--color-light-border)]">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[var(--color-green-600)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-light-text-inverse)] text-lg font-semibold">
                        {getUserInitial()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--color-black-900)] truncate">
                        {user?.name || "User"}
                      </h3>
                      <p className="text-sm text-[var(--color-black-600)] truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[var(--color-black-700)] hover:bg-[var(--color-green-50)] hover:text-[var(--color-green-700)] rounded-lg transition-colors group"
                  >
                    <svg 
                      className="w-4 h-4 text-[var(--color-black-500)] group-hover:text-[var(--color-green-600)] transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
