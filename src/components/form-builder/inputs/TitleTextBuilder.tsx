import React from "react";
import type { Question } from "../../../types";

interface TitleTextBuilderProps {
  question: Question;
  onUpdate: (question: Question) => void;
}

const TitleTextBuilder: React.FC<TitleTextBuilderProps> = ({ question, onUpdate }) => {
  return (
    <div className="mt-1">
      <input
        type="text"
        value={question.question_text}
        onChange={(e) => onUpdate({ ...question, question_text: e.target.value })}
        className="w-full text-2xl font-bold text-gray-900 border-none focus:ring-0 focus:outline-none bg-transparent"
        placeholder="Enter title text"
      />
    </div>
  );
};

export default TitleTextBuilder; 