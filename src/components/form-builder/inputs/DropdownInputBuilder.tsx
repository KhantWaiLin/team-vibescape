import React from "react";
import type { Question } from "../../../types";

interface DropdownInputBuilderProps {
  question: Question;
}

const DropdownInputBuilder: React.FC<DropdownInputBuilderProps> = ({ question }) => {
  return (
    <select
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
      disabled
    >
      <option value="">Select...</option>
      {question.options &&
        JSON.parse(question.options).map((opt: string, idx: number) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
    </select>
  );
};

export default DropdownInputBuilder; 