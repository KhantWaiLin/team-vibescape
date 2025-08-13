import React, { useEffect } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
