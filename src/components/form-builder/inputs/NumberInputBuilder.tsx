import React from "react";
import type { Question } from "../../../types";

interface NumberInputBuilderProps {
  question: Question;
}

const NumberInputBuilder: React.FC<NumberInputBuilderProps> = ({ question }) => {
  return (
    <input
      type="number"
      placeholder={question.placeholder || "Enter a number"}
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
      disabled
    />
  );
};

export default NumberInputBuilder; 