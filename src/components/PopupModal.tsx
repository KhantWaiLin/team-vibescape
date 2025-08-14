import React, { useEffect } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'auto';
  maxHeight?: string;
  className?: string;
  showHeader?: boolean;
  closeOnBackdropClick?: boolean;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'full',
  maxHeight = '90vh',
  className = '',
  showHeader = true,
  closeOnBackdropClick = true,
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
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case '2xl':
        return 'max-w-2xl';
      case '3xl':
        return 'max-w-3xl';
      case 'full':
        return 'max-w-full mx-4';
      case 'auto':
        return 'max-w-none mx-4';
      default:
        return 'max-w-md';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full ${getSizeClasses()} bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out overflow-hidden ${className}`}
        style={{ maxHeight }}
      >
        {/* Header - Only show if showHeader is true */}
        {showHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex-1" /> {/* Spacer for centering */}
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
        )}

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: showHeader ? `calc(${maxHeight} - 80px)` : maxHeight }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
