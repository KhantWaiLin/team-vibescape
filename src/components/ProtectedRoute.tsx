import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { verifyAuthToken } from "../services/api";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, token, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const [verifying, setVerifying] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const [lastVerifiedToken, setLastVerifiedToken] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      // Only verify if we have a token and it's different from the last verified one
      if (!token || token === lastVerifiedToken) return;
      
      setVerifying(true);
      try {
        const ok = await verifyAuthToken();
        setValid(ok);
        if (ok) {
          setLastVerifiedToken(token); // Remember this token as verified
        }
      } catch (error) {
        console.warn('Token verification failed:', error);
        setValid(false);
      } finally {
        setVerifying(false);
      }
    };
    check();
  }, [token, lastVerifiedToken]); // Remove location.pathname dependency

  // Show loading spinner while checking authentication
  if (isLoading || verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  // If token invalid per backend, redirect to login
  if (token && !valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin requirement if specified
  if (requireAdmin) {
    // You can add admin role check here later
    // For now, redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
