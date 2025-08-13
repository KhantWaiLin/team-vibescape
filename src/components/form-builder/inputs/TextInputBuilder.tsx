import React from "react";
import type { Question } from "../../../types";

interface TextInputBuilderProps {
  question: Question;
}

const TextInputBuilder: React.FC<TextInputBuilderProps> = ({ question }) => {
  return (
    <input
      type="text"
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
      placeholder={question.placeholder || "Enter your answer"}
      disabled
    />
  );
};

export default TextInputBuilder; 