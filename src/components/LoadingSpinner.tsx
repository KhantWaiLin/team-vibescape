import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center',
          spinner: 'h-8 w-8',
          text: 'text-sm'
        };
      case 'md':
        return {
          container: 'min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center',
          spinner: 'h-12 w-12',
          text: 'text-base'
        };
      case 'lg':
        return {
          container: 'min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center',
          spinner: 'h-16 w-16',
          text: 'text-lg'
        };
      default:
        return {
          container: 'min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center',
          spinner: 'h-12 w-12',
          text: 'text-base'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={sizeClasses.container}>
      <div className="text-center">
        <div className={`animate-spin rounded-full ${sizeClasses.spinner} border-b-2 border-[var(--color-green-600)] mx-auto`}></div>
        <p className={`text-[var(--color-green-600)] mt-4 ${sizeClasses.text}`}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 