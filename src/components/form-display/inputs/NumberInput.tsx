import React from "react";
import type { Question } from "../../../types";

interface NumberInputProps {
  question: Question;
  value?: number;
  onChange?: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ question, value, onChange }) => {
  return (
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange?.(Number(e.target.value))}
      placeholder={question.placeholder || "Enter a number"}
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
    />
  );
};

export default NumberInput; 