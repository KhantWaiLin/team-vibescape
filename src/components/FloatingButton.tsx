import React from "react";
import { floatingButtonIcon } from "../assets/icons/icons";

interface FloatingButtonProps {
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon = floatingButtonIcon(),
  text,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
}) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
    success:
      "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl",
  };

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
        ${className}
      `}
      aria-label={text || "Floating action button"}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {text && !icon && <span className="font-medium">{text}</span>}
    </button>
  );
};

export default FloatingButton;
