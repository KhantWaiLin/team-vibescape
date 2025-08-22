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
export const parseFormOptions = (
  options: string | string[] | null | undefined
): string[] => {
  // If options is already an array, return it
  if (Array.isArray(options)) {
    return options;
  }

  // If options is null, undefined, or empty string, return empty array
  if (!options || options.trim() === "") {
    return [];
  }

  // Try to parse JSON string
  try {
    const parsed = JSON.parse(options);

    // Ensure the parsed result is an array
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item)); // Convert all items to strings
    }

    // If parsed result is not an array, return empty array
    return [];
  } catch (error) {
    // If JSON parsing fails, return empty array
    console.warn("Failed to parse form options:", error);
    return [];
  }
};

/**
 * Safely gets the first option from form options
 *
 * @param options - The options value
 * @returns The first option as string, or empty string if no options
 */
export const getFirstOption = (
  options: string | string[] | null | undefined
): string => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length > 0 ? parsedOptions[0] : "";
};

/**
 * Checks if form options exist and have content
 *
 * @param options - The options value
 * @returns True if options exist and have at least one item
 */
export const hasOptions = (
  options: string | string[] | null | undefined
): boolean => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length > 0;
};

/**
 * Gets the number of options available
 *
 * @param options - The options value
 * @returns Number of options available
 */
export const getOptionsCount = (
  options: string | string[] | null | undefined
): number => {
  const parsedOptions = parseFormOptions(options);
  return parsedOptions.length;
};

/**
 * Checks if a question is new (not yet saved to database)
 *
 * @param question - The question object
 * @returns True if the question is new, false if it exists
 *
 * @example
 * ```tsx
 * const isNew = isNewQuestion(question);
 * if (isNew) {
 *   // Handle new question (create)
 * } else {
 *   // Handle existing question (update)
 * }
 * ```
 */
export const isNewQuestion = (question: {
  id?: string | number | null;
}): boolean => {
  // Question is new if:
  // 1. No ID exists
  // 2. ID is null or undefined
  // 3. ID is a temporary ID (starts with 'temp_')
  // 4. ID is 0 or negative
  return (
    !question.id ||
    question.id === null ||
    question.id === undefined ||
    question.id.toString().startsWith("temp_") ||
    (typeof question.id === "number" && question.id <= 0)
  );
};

/**
 * Separates questions into new and existing arrays
 *
 * @param questions - Array of questions
 * @returns Object with newQuestions and existingQuestions arrays
 *
 * @example
 * ```tsx
 * const { newQuestions, existingQuestions } = separateQuestionsByStatus(questions);
 *
 * // Send new questions to CREATE endpoint
 * if (newQuestions.length > 0) {
 *   await apiService.post('/api/questions', { questions: newQuestions });
 * }
 *
 * // Send existing questions to UPDATE endpoint
 * if (existingQuestions.length > 0) {
 *   await apiService.put('/api/questions/bulk', { questions: existingQuestions });
 * }
 * ```
 */
export const separateQuestionsByStatus = <
  T extends {
    id?: string | number | null;
    question_text: string;
  }
>(
  questions: T[]
): { newQuestions: T[]; existingQuestions: T[] } => {
  const newQuestions: T[] = [];
  const existingQuestions: T[] = [];

  questions.forEach((question, index) => {
    if (isNewQuestion(question)) {
      newQuestions.push(question);
    } else {
      existingQuestions.push(question);
    }
  });

  return { newQuestions, existingQuestions };
};

/**
 * Prepares questions for API submission, handling new vs existing questions
 *
 * @param questions - Array of questions
 * @returns Formatted questions ready for API submission
 *
 * @example
 * ```tsx
 * const formattedQuestions = prepareQuestionsForSubmission(questions);
 * // formattedQuestions will have question_id only for existing questions
 * ```
 */
export const prepareQuestionsForSubmission = <
  T extends {
    id?: string | number | null;
    question_text: string;
    question_type: string;
    is_required: number;
    options?: any;
    placeholder?: string;
  }
>(
  questions: T[]
): Array<{
  question_id?: number | string;
  question_text: string;
  question_type: string;
  is_required: number;
  options: string[];
  placeholder?: string;
  order: number;
}> => {
  return questions.map((q, index) => {
    const isNew = isNewQuestion(q);

    const questionData: any = {
      question_text: q.question_text,
      question_type: q.question_type,
      is_required: q.is_required,
      options: parseFormOptions(q.options),
      placeholder: q.placeholder,
      order: index + 1,
    };

    // Only add question_id for existing questions
    if (!isNew && q.id) {
      questionData.question_id = q.id;
    }

    return questionData;
  });
};
