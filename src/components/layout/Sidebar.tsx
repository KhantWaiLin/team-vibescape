import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { chooseNavItems } from "../../utils/navUtils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  // Choose navigation items based on admin status
  const navItems = chooseNavItems(isAdmin());
  
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
        fixed top-0 left-0 h-full bg-[var(--color-light-card)] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}
      >
        {/* Sidebar Header */}
        <div className="lg:hidden flex items-center justify-end p-4 border-b border-[var(--color-light-border)]">
          <button
            onClick={onToggle}
            className="text-[var(--color-light-text-muted)] hover:text-[var(--color-light-text-secondary)]"
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
                      ? "bg-[var(--color-green-100)] text-[var(--color-green-700)] border-r-2 border-[var(--color-green-600)] font-[400]"
                      : "text-[var(--color-black-500)] font-[400] hover:bg-[var(--color-black-100)] hover:text-[var(--color-black-700)]"
                  }
                `}
              >
                <span className="mr-3 text-lg">
                  {item.icon({ isActive: isActive(item.path) })}
                </span>
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
