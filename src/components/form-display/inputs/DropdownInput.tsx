import React from "react";
import type { Question } from "../../../types";
import { parseFormOptions } from "../../../utils";

interface DropdownInputProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
    >
      <option value="">Select...</option>
      {parseFormOptions(question?.options).map((opt: string, idx: number) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
    </select>
  );
};

export default DropdownInput;
