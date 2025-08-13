import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-green-600)] mx-auto"></div>
      <p className="text-[var(--color-green-600)] mt-4">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner; 