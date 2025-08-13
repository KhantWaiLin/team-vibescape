import React from "react";
import type { Question } from "../../../types";

interface CheckboxGroupInputProps {
  question: Question;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroupInput: React.FC<CheckboxGroupInputProps> = ({ question, value, onChange }) => {
  const selectedValues = value || [];
  
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange?.([...selectedValues, optionValue]);
    } else {
      onChange?.(selectedValues.filter(v => v !== optionValue));
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-1">
      {question.options &&
        JSON.parse(question.options).map((opt: string, idx: number) => (
          <label key={idx} className="inline-flex items-center text-[var(--color-light-text-primary)] font-medium">
            <input
              type="checkbox"
              value={opt}
              checked={selectedValues.includes(opt)}
              onChange={(e) => handleChange(opt, e.target.checked)}
              className="form-checkbox text-[var(--color-primary)] focus:ring-[var(--color-primary)] mr-2"
            />
            {opt}
          </label>
        ))}
    </div>
  );
};

export default CheckboxGroupInput; 