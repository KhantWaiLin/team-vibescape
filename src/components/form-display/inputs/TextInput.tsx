import React from "react";
import type { Question } from "../../../types";

interface TextInputProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ question, value, onChange }) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="mt-1 block w-full border-b border-[var(--color-light-border)] focus:border-[var(--color-primary)] bg-transparent text-[var(--color-light-text-primary)] placeholder-[var(--color-light-text-muted)] px-0 py-2"
      placeholder={question.placeholder || "Enter your answer"}
    />
  );
};

export default TextInput; 