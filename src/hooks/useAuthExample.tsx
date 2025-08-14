import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// Example component showing how to use the useAuth hook
export const AuthExample: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    hasRole,
    login,
    logout,
    getAuthHeaders
  } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password123');
  };

  const handleLogout = () => {
    logout();
  };

  // Example of conditional rendering based on admin status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Please Login</h2>
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      
      {/* Admin-only content */}
      {isAdmin() && (
        <div>
          <h3>Admin Panel</h3>
          <p>This content is only visible to admins</p>
        </div>
      )}

      {/* Role-based content */}
      {hasRole('moderator') && (
        <div>
          <h3>Moderator Tools</h3>
          <p>Moderator-specific content</p>
        </div>
      )}

      {/* Example of using auth headers for API calls */}
      <button onClick={async () => {
        const headers = getAuthHeaders();
        // Use headers in your API calls
        console.log('Auth headers:', headers);
      }}>
        Get Auth Headers
      </button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Example of using the hook in a simple component
export const UserStatus: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <span>Not logged in</span>;
  }

  return (
    <span>
      {user?.name} {isAdmin() && '(Admin)'}
    </span>
  );
};

// Example of protected route component
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Access denied. Please login.</div>;
  }

  return <>{children}</>;
};

// Example of admin-only route component
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Access denied. Please login.</div>;
  }

  if (!isAdmin()) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return <>{children}</>;
};
