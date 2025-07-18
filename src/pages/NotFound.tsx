import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-green-800 mb-4">404</div>
        <h1 className="text-3xl font-semibold text-green-700 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-green-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 