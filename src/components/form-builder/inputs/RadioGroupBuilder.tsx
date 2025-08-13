import React from "react";
import type { Question } from "../../../types";

interface RadioGroupBuilderProps {
  question: Question;
}

const RadioGroupBuilder: React.FC<RadioGroupBuilderProps> = ({ question }) => {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {question.options &&
        JSON.parse(question.options).map((opt: string, idx: number) => (
          <label key={idx} className="inline-flex items-center text-gray-800 font-medium">
            <input
              type="radio"
              value={opt}
              className="form-radio text-blue-600 focus:ring-blue-400 mr-2"
              disabled
            />
            {opt}
          </label>
        ))}
    </div>
  );
};

export default RadioGroupBuilder; 