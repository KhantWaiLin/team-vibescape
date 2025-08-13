import React from "react";
import type { Question } from "../../../types";

interface RatingInputBuilderProps {
  question: Question;
}

const RatingInputBuilder: React.FC<RatingInputBuilderProps> = ({ question }) => {
  return (
    <input
      type="number"
      min={1}
      max={5}
      placeholder={question.placeholder || "Rate 1-5"}
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
      disabled
    />
  );
};

export default RatingInputBuilder; 