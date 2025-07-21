import React from 'react';

interface QuestionTypeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  disabled?: boolean;
}

const QuestionTypeButton: React.FC<QuestionTypeButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'gray',
  disabled = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      case 'gray':
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center space-x-3 p-3 text-left rounded-lg 
        border border-gray-200 transition-all duration-200
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm cursor-pointer'
        }
      `}
    >
      <div className={`w-8 h-8 rounded flex items-center justify-center ${getVariantClasses()}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </button>
  );
};

export default QuestionTypeButton; 