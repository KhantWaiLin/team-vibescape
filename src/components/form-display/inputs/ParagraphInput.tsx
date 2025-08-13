import React from "react";
import type { Question } from "../../../types";

interface ParagraphInputProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
}

const ParagraphInput: React.FC<ParagraphInputProps> = ({ question, value, onChange }) => {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="mt-1 block w-full border-b border-[var(--color-light-border)] focus:border-[var(--color-primary)] bg-transparent text-[var(--color-light-text-primary)] placeholder-[var(--color-light-text-muted)] px-0 py-2"
      placeholder={question.placeholder || "Enter your answer"}
      rows={4}
    />
  );
};

export default ParagraphInput; 