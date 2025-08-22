import React from "react";
import type { FloatingButtonProps } from "../types";
import floatingButtonStar from "../assets/images/floating_button_star.png";

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        ${sizeClasses[size]}
        bg-white
        rounded-full
        flex items-center justify-center
        border-2 border-gray-200
        shadow-2xl hover:shadow-3xl
        ring-2 ring-gray-100
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-[var(--color-green-300)] focus:ring-opacity-50
        ${className}
      `}
      aria-label="Floating action button"
    >
      {/* Star Icon */}
      <img 
        src={floatingButtonStar} 
        alt="Star icon" 
        className="w-8 h-8"
      />
    </button>
  );
};

export default FloatingButton;
