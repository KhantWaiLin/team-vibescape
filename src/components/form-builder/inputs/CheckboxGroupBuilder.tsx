import React from "react";
import type { Question } from "../../../types";
import { parseFormOptions } from "../../../utils";

interface CheckboxGroupBuilderProps {
  question: Question;
}

const CheckboxGroupBuilder: React.FC<CheckboxGroupBuilderProps> = ({ question }) => {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {parseFormOptions(question?.options).map((opt: string, idx: number) => (
          <label key={idx} className="inline-flex items-center text-gray-800 font-medium">
            <input
              type="checkbox"
              value={opt}
              className="form-checkbox text-blue-600 focus:ring-blue-400 mr-2"
              disabled
            />
            {opt}
          </label>
        ))}
    </div>
  );
};

export default CheckboxGroupBuilder; 