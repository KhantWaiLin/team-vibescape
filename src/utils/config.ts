// Environment Configuration Utility

// Let Vite automatically detect environment
const getEnvironment = () => {
  // Vite automatically sets these based on how you run the app
  return import.meta.env.MODE; // 'development' | 'production'
};

// Get API base URL based on Vite's environment
const getApiBaseUrl = () => {
  // Check if custom API URL is set
  const customApiUrl = import.meta.env.VITE_API_BASE_URL;

  if (customApiUrl) {
    return customApiUrl;
  }

  // Use local Laravel backend for development
  return "http://localhost:8000";
};

export const config = {
  // Environment - automatically detected by Vite
  environment: getEnvironment(),

  // API Configuration
  baseUrl: getApiBaseUrl(),

  // Vite's automatic environment info
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
};

// Helper functions - based on Vite's automatic detection
export const isDevelopment = config.environment === "development";
export const isProduction = config.environment === "production";

// Log environment info
// console.log("🌍 Environment (Vite Auto-Detected):", {
//   environment: config.environment,
//   apiBaseUrl: config.baseUrl,
//   mode: config.mode,
//   dev: config.dev,
//   prod: config.prod,
// });
