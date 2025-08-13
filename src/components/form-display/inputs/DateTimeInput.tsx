import React from "react";
import type { Question } from "../../../types";

interface DateTimeInputProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ question, value, onChange }) => {
  return (
    <input
      type="datetime-local"
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
      title={question.placeholder || "Select date and time"}
    />
  );
};

export default DateTimeInput; 