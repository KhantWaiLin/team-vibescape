import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-black-100)] to-[var(--color-light-bg)] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-[var(--color-green-600)] mb-4">404</div>
        <h1 className="text-3xl font-semibold text-[var(--color-black-900)] mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-[var(--color-black-600)] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-[var(--color-light-text-inverse)] py-3 px-6 rounded-md transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 