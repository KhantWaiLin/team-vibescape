import React from "react";
import { navItems } from "../../const/navigation";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onToggle();
            }
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}
      >
        {/* Sidebar Header */}
        <div className="lg:hidden flex items-center justify-end p-4 border-b border-gray-200">
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="pt-6">
          <div className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? "bg-green-100  text-primary border-r-2 border-green-500 font-[400]"
                      : "text-gray-400 font-[400] hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
