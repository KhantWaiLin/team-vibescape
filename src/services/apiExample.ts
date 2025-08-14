// Example usage of the API service
import { apiService, API_ENDPOINTS, get, post } from './api';

// Example 1: Using the apiService instance
export const exampleApiCalls = {
  // Get all forms
  getForms: async () => {
    try {
      const forms = await apiService.get(API_ENDPOINTS.FORMS.LIST);
      return forms;
    } catch (error) {
      console.error('Failed to fetch forms:', error);
      throw error;
    }
  },

  // Create a new form
  createForm: async (formData: any) => {
    try {
      const newForm = await apiService.post(API_ENDPOINTS.FORMS.CREATE, formData);
      return newForm;
    } catch (error) {
      console.error('Failed to create form:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const profile = await apiService.get(API_ENDPOINTS.USER.PROFILE);
      return profile;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  },

  // Login user
  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
};

// Example 2: Using individual exported methods
export const exampleDirectCalls = {
  // Get templates
  getTemplates: () => get(API_ENDPOINTS.TEMPLATES.LIST),
  
  // Create a question
  createQuestion: (formId: number, questionData: any) => 
    post(API_ENDPOINTS.QUESTIONS.CREATE(formId), questionData),
};

// Example 3: Using in React components
export const useApiInComponent = () => {
  const handleSubmit = async (formData: any) => {
    try {
      // Show loading state
      const response = await apiService.post(API_ENDPOINTS.FORMS.CREATE, formData);
      
      // Handle success
      console.log('Form created:', response);
      return response;
      
    } catch (error) {
      // Handle error
      console.error('Failed to create form:', error);
      throw error;
    }
  };

  return { handleSubmit };
};
