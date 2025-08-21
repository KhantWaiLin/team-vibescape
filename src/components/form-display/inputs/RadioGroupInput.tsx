import React from "react";
import type { Question } from "../../../types";
import { parseFormOptions } from "../../../utils";

interface RadioGroupInputProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {parseFormOptions(question?.options).map((opt: string, idx: number) => (
          <label
            key={idx}
            className="inline-flex items-center text-[var(--color-light-text-primary)] font-medium"
          >
            <input
              type="radio"
              name={`question-${question.id ?? "temp"}`}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange?.(e.target.value)}
              className="form-radio text-[var(--color-primary)] focus:ring-[var(--color-primary)] mr-2"
            />
            {opt}
          </label>
        ))}
    </div>
  );
};

export default RadioGroupInput;
