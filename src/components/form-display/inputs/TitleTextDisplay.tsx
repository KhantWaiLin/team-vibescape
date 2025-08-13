import React from "react";
import type { Question } from "../../../types";

interface TitleTextDisplayProps {
  question: Question;
}

const TitleTextDisplay: React.FC<TitleTextDisplayProps> = ({ question }) => {
  return (
    <div className="mt-1">
      <h2 className="text-2xl font-bold text-gray-900">{question.question_text}</h2>
    </div>
  );
};

export default TitleTextDisplay; 