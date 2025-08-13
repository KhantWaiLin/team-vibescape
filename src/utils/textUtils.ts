/**
 * Truncates text to a specified number of words and adds ellipsis
 * @param text - The text to truncate
 * @param limit - Maximum number of words to keep
 * @returns Truncated text with ellipsis if needed
 */
export const truncateWords = (text: string, limit: number): string => {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};
