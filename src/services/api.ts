import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../utils/config";
import { getAuthCookie, removeAuthCookie } from "../utils/cookieUtils";

// API Configuration
const API_BASE_URL = config.baseUrl;

console.log("🔧 API Service Configuration:", {
  baseUrl: API_BASE_URL,
  environment: config.environment,
  mode: config.mode,
});

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  withCredentials: true, // Include cookies for CSRF
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest", // Laravel expects this
  },
});

// ===== Token verification via API =====
export const verifyAuthToken = async (): Promise<boolean> => {
  try {
    // Call profile endpoint with Bearer token; success implies token valid
    await axiosInstance.get(API_ENDPOINTS.USER.PROFILE, {
      headers: apiService.getAuthHeaders(),
    });
    return true;
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) {
      removeAuthCookie("authToken");
      removeAuthCookie("authUser");
      return false;
    }
    // For other errors (network/5xx), don't block the user; treat token as still valid
    console.warn("Token verification non-auth error; allowing access:", status);
    return true;
  }
};

// Request interceptor to add auth token and handle CSRF
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add Bearer token if available
    const authToken = getAuthCookie("authToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
      console.log("🔑 Added Bearer token to request");
    }

    // For non-GET requests, ensure we have CSRF token
    if (config.method !== "get") {
      try {
        // Get CSRF token from Sanctum
        await axios.get(`${config.baseURL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });
        console.log("🛡️ CSRF token obtained");
      } catch (error) {
        console.warn("⚠️ Could not get CSRF token:", error);
      }
    }

    console.log("🚀 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error("❌ API Error:", {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    // Handle common errors
    if (error.response?.status === 401) {
      console.log("🔒 Unauthorized - clearing auth data");
      removeAuthCookie("authToken");
      removeAuthCookie("authUser");
      // You can redirect to login here if needed
    }

    if (error.response?.status === 422) {
      console.log("📝 Validation error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

// API Service Class
class ApiService {
  // GET request
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint, config);
    return response.data;
  }

  // POST request
  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  // POST request without data (for simple requests)
  async postWithoutData<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, undefined, config);
    return response.data;
  }

  // PUT request
  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, data, config);
    return response.data;
  }

  // Get auth headers (for backward compatibility)
  getAuthHeaders(): Record<string, string> {
    const token = getAuthCookie("authToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
}

// Create and export API service instance
export const apiService = new ApiService();

// Export individual methods for convenience
export const {
  get,
  post,
  postWithoutData,
  put,
  delete: del,
  patch,
} = apiService;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/api/login",
    REGISTER: "/api/register",
    LOGOUT: "/api/logout",
    REFRESH: "/api/refresh",
  },

  // Forms endpoints
  FORMS: {
    LIST: "/api/forms",
    CREATE: "/api/forms",
    RECENT: "/api/forms/recent",
    DETAIL: (id: string | number) => `/api/forms/${id}`,
    UPDATE: (id: string | number) => `/api/forms/${id}`,
    DELETE: (id: string | number) => `/api/forms/${id}`,
    PBULIC: (url: string) => `/api/forms/public/${url}`,
    PUBLISH: (id: string | number) => `/api/forms/${id}/publish`,
    UNPUBLISH: (id: string | number) => `/api/forms/${id}/unpublish`,
    SUBMIT_TO_ADMIN: (id: string | number) => `/api/forms/${id}/submit`,
  },

  ADMIN: {
    APPROVED: (id: string | number) => `/api/forms/${id}/approve`,
    REJECT: (id: string | number) => `/api/forms/${id}/reject`,
    PUBLISH: (id: string | number) => `/api/forms/${id}/publish`,
  },

  SEARCH: {
    SEARCH: ({
      keyword,
      status,
      page,
      per_page,
    }: {
      keyword?: string;
      status?: string;
      page?: number;
      per_page?: number;
    }) => {
      const params = new URLSearchParams();

      if (keyword) params.append("q", keyword);
      if (status) params.append("status", status);
      if (per_page) params.append("per_page", per_page.toString());
      if (page) params.append("page", page.toString());

      const queryString = params.toString();
      return `/api/forms/search${queryString ? `?${queryString}` : ""}`;
    },
  },

  AI: {
    GENERATE: "/api/forms/template-generate",
  },

  // Questions endpoints
  QUESTIONS: {
    LIST: (formId: string | number) => `/api/forms/${formId}/questions`,
    CREATE: (formId: string | number) => `/api/forms/${formId}/questions`,
    SHOW: (formId: string | number, questionId: string | number) =>
      `/api/forms/${formId}/questions/${questionId}`,
    UPDATE: (formId: string | number, questionId: string | number) =>
      `/api/forms/${formId}/questions/${questionId}`,
    DELETE: (formId: string | number, questionId: string | number) =>
      `/api/forms/${formId}/questions/${questionId}`,
    BULK_CREATE: (formId: string | number) =>
      `/api/forms/${formId}/questions/bulk`,
    BULK_UPDATE: (formId: string | number) =>
      `/api/forms/${formId}/questions/bulk`,
  },

  // Templates endpoints
  TEMPLATES: {
    LIST: "/api/form-templates",
    SHOW: (id: string | number) => `/api/templates/${id}`,
    USE: (id: string | number) => `/api/templates/${id}/use`,
  },

  // Responses endpoints
  RESPONSES: {
    LIST: (formId: string | number) => `/forms/${formId}/responses`,
    SHOW: (formId: string | number, responseId: string | number) =>
      `/forms/${formId}/responses/${responseId}`,
    CREATE: `/api/form-submissions/multiple`,
    EXPORT: (formId: string | number) =>
      `/api/form-submissions/export/${formId}`,
  },

  // User endpoints
  USER: {
    PROFILE: "/api/profile",
    UPDATE_PROFILE: "/api/user/profile",
    FORMS: "/api/user/forms",
    DASHBOARD: "/api/user/dashboard",
  },
} as const;
