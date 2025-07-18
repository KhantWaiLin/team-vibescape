// Environment Configuration Utility
export const config = {
  // API Configurationx
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  environment: import.meta.env.VITE_ENVIRONMENT || "development",
};

// Helper function to check if we're in development
export const isDevelopment = config.environment === "development";

// Helper function to check if we're in production
export const isProduction = config.environment === "production";
