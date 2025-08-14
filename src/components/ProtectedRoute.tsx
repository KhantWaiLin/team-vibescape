import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, token, isLoading } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin requirement if specified
  if (requireAdmin && !user) {
    // You can add admin role check here later
    // For now, redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
