import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { apiService, API_ENDPOINTS } from "../services/api";
import { setAuthCookie, getAuthCookie, removeAuthCookie } from "../utils/cookieUtils";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AuthResponse {
  code: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;

  // Utility functions
  isAdmin: () => boolean;
  hasRole: (role: string) => boolean;
  getAuthHeaders: () => Record<string, string>;
}

// Action types
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = getAuthCookie("authToken");
      const storedUser = getAuthCookie("authUser");

      if (storedToken && storedUser) {
        try {
          // For now, we'll trust the stored token and user data
          // In a real app, you might want to validate with a protected endpoint
          const userData = JSON.parse(storedUser);

          // Check if token is not expired (basic check)
          // You can add JWT expiration check here if needed

          dispatch({
            type: "AUTH_SUCCESS",
            payload: { user: userData, token: storedToken },
          });
        } catch (error) {
          // Invalid stored data, clear cookies
          removeAuthCookie("authToken");
          removeAuthCookie("authUser");
        }
      }
    };

    initializeAuth();
  }, []);

  // Login function using API service
  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    try {
      const data = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      // Store in cookies
      setAuthCookie("authToken", data.data.token, 30); // 30 days expiry
      setAuthCookie("authUser", JSON.stringify(data.data.user), 30);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.data.user, token: data.data.token },
      });
    } catch (error: any) {
      // Handle API errors
      const errorMessage =
        error.message || "Login failed. Please check your credentials.";
      dispatch({
        type: "AUTH_FAILURE",
        payload: errorMessage,
      });
      throw error; // Re-throw so Login component can handle it
    }
  };

  // Register function using API service
  const register = async (email: string, password: string, name: string) => {
    dispatch({ type: "AUTH_START" });

    try {
      const data = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        { email, password, name }
      );

      // Store in cookies
      setAuthCookie("authToken", data.data.token, 30); // 30 days expiry
      setAuthCookie("authUser", JSON.stringify(data.data.user), 30);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.data.user, token: data.data.token },
      });
    } catch (error: any) {
      // Handle API errors
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      dispatch({
        type: "AUTH_FAILURE",
        payload: errorMessage,
      });
      throw error; // Re-throw so Register component can handle it
    }
  };

  // Logout function
  const logout = () => {
    removeAuthCookie("authToken");
    removeAuthCookie("authUser");
    dispatch({ type: "AUTH_LOGOUT" });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Utility functions - updated for actual user structure
  const isAdmin = (): boolean => {
    // You can implement admin check based on your business logic
    // For now, checking if user exists (you can add role-based logic later)
    return state.user !== null;
  };

  const hasRole = (_role: string): boolean => {
    // You can implement role checking based on your business logic
    // For now, returning true if user exists (you can add role-based logic later)
    return state.user !== null;
  };

  const getAuthHeaders = (): Record<string, string> => {
    return {
      Authorization: `Bearer ${state.token}`,
      "Content-Type": "application/json",
    };
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    clearError,
    isAdmin,
    hasRole,
    getAuthHeaders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
