import React from "react";
import type { Question } from "../../../types";

interface ParagraphInputBuilderProps {
  question: Question;
}

const ParagraphInputBuilder: React.FC<ParagraphInputBuilderProps> = ({ question }) => {
  return (
    <textarea
      className="mt-1 block w-full border shadow-sm rounded-lg border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 p-2"
      placeholder={question.placeholder || "Enter your answer"}
      rows={4}
      disabled
    />
  );
};

export default ParagraphInputBuilder; 