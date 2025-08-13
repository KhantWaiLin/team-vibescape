import React, { useState, useRef, useEffect } from "react";

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All Categories",
    "Education",
    "Marketing",
    "Training",
    "Services",
    "Events",
    "Business",
    "Personal",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-[var(--color-black-100)] border border-[var(--color-black-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] text-[var(--color-black-900)] flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--color-light-card)] border border-[var(--color-light-border)] rounded-lg shadow-lg max-h-60 overflow-auto">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`w-full px-4 py-2 text-left hover:bg-[var(--color-black-100)] transition-colors ${
                value === category
                  ? "bg-[var(--color-green-100)] text-[var(--color-green-700)]"
                  : "text-[var(--color-black-700)]"
              }`}
              onClick={() => {
                onChange(category);
                setIsOpen(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
