/**
 * Form utility functions for handling form data and options
 */

/**
 * Safely parses form options that might be JSON strings or already arrays
 * 
 * @param options - The options value which could be a string, array, or null/undefined
 * @returns An array of strings, or empty array if parsing fails
 * 
 * @example
 * ```tsx
 * // JSON string
 * parseFormOptions('["Option 1", "Option 2"]') // Returns: ["Option 1", "Option 2"]
 * 
 * // Already an array
 * parseFormOptions(["Option 1", "Option 2"]) // Returns: ["Option 1", "Option 2"]
 * 
 * // Invalid JSON or null
 * parseFormOptions('invalid json') // Returns: []
 * parseFormOptions(null) // Returns: []
 * ```
 */
export const parseFormOptions = (options: string | string[] | null | undefined): string[] => {
  // If options is already an array, return it
  if (Array.isArray(options)) {
    return options;
  }

  // If options is null, undefined, or empty string, return empty array
  if (!options || options.trim() === '') {
    return [];
  }

  // Try to parse JSON string
  try {
    const parsed = JSON.parse(options);
    
    // Ensure the parsed result is an array
    if (Array.isArray(parsed)) {
      return parsed.map(item => String(item)); // Convert all items to strings
    }
    
    // If parsed result is not an array, return empty array
    return [];
  } catch (error) {
    // If JSON parsing fails, return empty array
    console.warn('Failed to parse form options:', error);
    return [];
  }
};

/**
 * Safely gets the first option from form options
 * 
 * @param options - The options value
 * @returns The first option as string, or empty string if no options
 */
export const getFirstOption = (options: string | string[] | null | undefined): string => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length > 0 ? parsedOptions[0] : '';
};

/**
 * Checks if form options exist and have content
 * 
 * @param options - The options value
 * @returns True if options exist and have at least one item
 */
export const hasOptions = (options: string | string[] | null | undefined): boolean => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length > 0;
};

/**
 * Gets the number of options available
 * 
 * @param options - The options value
 * @returns Number of options available
 */
export const getOptionsCount = (options: string | string[] | null | undefined): number => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length;
};
