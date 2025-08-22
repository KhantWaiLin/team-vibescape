import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { apiService, API_ENDPOINTS } from "../services/api";
import {
  setAuthCookie,
  getAuthCookie,
  removeAuthCookie,
} from "../utils/cookieUtils";
import { verifyAuthToken } from "../services/api";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role_names?: string[];
  permissions?: string[];
  roles?: Array<{
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Array<{
      id: number;
      name: string;
      guard_name: string;
      created_at: string;
      updated_at: string;
    }>;
  }>;
}

interface AuthResponse {
  code: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface ProfileResponse {
  code: number;
  message: string;
  data: {
    user: User;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean; // Add isAdmin as a state variable
}

interface AuthContextType {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean; // Change from function to boolean

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;
  fetchProfile: () => Promise<void>;

  // Utility functions
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  getAuthHeaders: () => Record<string, string>;
}

// Action types
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_PROFILE"; payload: User }
  | { type: "UPDATE_ADMIN_STATUS"; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  isAdmin: false, // Initialize isAdmin
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
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_ADMIN_STATUS":
      return {
        ...state,
        isAdmin: action.payload,
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
      // Begin initialization in loading state to avoid premature redirects
      dispatch({ type: "SET_LOADING", payload: true });
      const storedToken = getAuthCookie("authToken");
      const storedUser = getAuthCookie("authUser");

      try {
        if (storedToken && storedUser) {
          // Validate with backend profile endpoint
          const ok = await verifyAuthToken();
          if (ok) {
            try {
              const userData = JSON.parse(storedUser);
              dispatch({
                type: "AUTH_SUCCESS",
                payload: { user: userData, token: storedToken },
              });

              // Fetch fresh profile data with roles and permissions
              const response = await apiService.get<ProfileResponse>(
                API_ENDPOINTS.USER.PROFILE
              );
              if (response.code === 200 && response.data?.user) {
                dispatch({
                  type: "UPDATE_PROFILE",
                  payload: response.data.user,
                });
                setAuthCookie(
                  "authUser",
                  JSON.stringify(response.data.user),
                  30
                );
              }
            } catch (error) {
              removeAuthCookie("authToken");
              removeAuthCookie("authUser");
            }
          } else {
            removeAuthCookie("authToken");
            removeAuthCookie("authUser");
          }
        }
      } finally {
        // Always end loading after initialization completes
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function using API service
  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    try {
      const data = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      // Store in cookies
      setAuthCookie("authToken", data.data.token, 30); // 30 days expiry
      setAuthCookie("authUser", JSON.stringify(data.data.user), 30);

      // Fetch fresh profile data with roles and permissions using the token we just received
      try {
        const profileResponse = await apiService.get<ProfileResponse>(
          API_ENDPOINTS.USER.PROFILE,
          { headers: { Authorization: `Bearer ${data.data.token}` } }
        );
        
        if (profileResponse.code === 200 && profileResponse.data?.user) {
          // Update user data with roles and permissions
          dispatch({ type: "UPDATE_PROFILE", payload: profileResponse.data.user });
          
          // Update stored user data in cookies with roles
          setAuthCookie("authUser", JSON.stringify(profileResponse.data.user), 30);
          
          // Check admin status immediately and update state
          const adminStatus = profileResponse.data.user.role_names?.includes('admin') || false;
          dispatch({ type: "UPDATE_ADMIN_STATUS", payload: adminStatus });
          
          console.log('✅ Profile fetched during login:', profileResponse.data.user);
          console.log('✅ User roles:', profileResponse.data.user.role_names);
          console.log('✅ Admin status set to:', adminStatus);
        }
      } catch (profileError) {
        console.warn('⚠️ Could not fetch profile during login, using basic user data:', profileError);
      }
      
      // Now dispatch success with the updated user data (including roles if available)
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

      // Fetch fresh profile data with roles and permissions using the token we just received
      try {
        const profileResponse = await apiService.get<ProfileResponse>(
          API_ENDPOINTS.USER.PROFILE,
          { headers: { Authorization: `Bearer ${data.data.token}` } }
        );
        
        if (profileResponse.code === 200 && profileResponse.data?.user) {
          // Update user data with roles and permissions
          dispatch({ type: "UPDATE_PROFILE", payload: profileResponse.data.user });
          
          // Update stored user data in cookies with roles
          setAuthCookie("authUser", JSON.stringify(profileResponse.data.user), 30);
          
          // Check admin status immediately and update state
          const adminStatus = profileResponse.data.user.role_names?.includes('admin') || false;
          dispatch({ type: "UPDATE_ADMIN_STATUS", payload: adminStatus });
          
          console.log('✅ Profile fetched during registration:', profileResponse.data.user);
          console.log('✅ User roles:', profileResponse.data.user.role_names);
          console.log('✅ Admin status set to:', adminStatus);
        }
      } catch (profileError) {
        console.warn('⚠️ Could not fetch profile during registration, using basic user data:', profileError);
      }
      
      // Now dispatch success with the updated user data (including roles if available)
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

  // Fetch user profile with roles and permissions
  const fetchProfile = async () => {
    if (!state.token) {
      console.warn('No token available to fetch profile');
      return;
    }

    try {
      const response = await apiService.get<ProfileResponse>(API_ENDPOINTS.USER.PROFILE);
      
      if (response.code === 200 && response.data?.user) {
        // Update user data with roles and permissions
        dispatch({ type: "UPDATE_PROFILE", payload: response.data.user });
        
        // Check admin status immediately and update state
        const adminStatus = response.data.user.role_names?.includes('admin') || false;
        dispatch({ type: "UPDATE_ADMIN_STATUS", payload: adminStatus });
        
        // Update stored user data in cookies
        setAuthCookie("authUser", JSON.stringify(response.data.user), 30);
        
        console.log('✅ Profile fetched successfully:', response.data.user);
        console.log('✅ User roles:', response.data.user.role_names);
        console.log('✅ Admin status updated to:', adminStatus);
      }
    } catch (error: any) {
      console.error('❌ Error fetching profile:', error);
      // Don't throw error here to avoid breaking the app
    }
  };

  // Utility functions - updated for actual user structure
  // Usage examples:
  // const { isAdmin, hasRole, hasPermission } = useAuth();
  // if (isAdmin) { /* show admin features */ }
  // if (hasRole('moderator')) { /* show moderator features */ }
  // if (hasPermission('delete forms')) { /* show delete button */ }
  
  const hasRole = (role: string): boolean => {
    return state.user?.role_names?.includes(role) || false;
  };

  const hasPermission = (permission: string): boolean => {
    // Check if user has the permission through any of their roles
    return (
      state.user?.roles?.some((role) =>
        role.permissions?.some((perm) => perm.name === permission)
      ) || false
    );
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
    fetchProfile,
    hasRole,
    hasPermission,
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
