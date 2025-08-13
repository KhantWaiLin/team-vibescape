import React from "react";
import type { Question } from "../../types";
import {
  TextInput,
  ParagraphInput,
  DropdownInput,
  DateTimeInput,
  RadioGroupInput,
  CheckboxGroupInput,
  RatingInput,
  NumberInput,
  FileInput,
  TitleTextDisplay,
  DividerDisplay
} from "./inputs";
import { requireIcon } from "../../assets/icons/icons";

interface QuestionBlockProps {
  question: Question;
  value?: any;
  onChange?: (value: any) => void;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ 
  question, 
  value, 
  onChange 
}) => {
  let inputComponent = null;
  
  switch (question.question_type) {
    case "text":
      inputComponent = <TextInput question={question} value={value} onChange={onChange} />;
      break;
    case "paragraph":
      inputComponent = <ParagraphInput question={question} value={value} onChange={onChange} />;
      break;
    case "dropdown":
      inputComponent = <DropdownInput question={question} value={value} onChange={onChange} />;
      break;
    case "datetime":
      inputComponent = <DateTimeInput question={question} value={value} onChange={onChange} />;
      break;
    case "multiple_choice":
      inputComponent = <RadioGroupInput question={question} value={value} onChange={onChange} />;
      break;
    case "checkboxes":
      inputComponent = <CheckboxGroupInput question={question} value={value} onChange={onChange} />;
      break;
    case "rating":
      inputComponent = <RatingInput question={question} value={value} onChange={onChange} />;
      break;
    case "number":
      inputComponent = <NumberInput question={question} value={value} onChange={onChange} />;
      break;
    case "file":
      inputComponent = <FileInput question={question} value={value} onChange={onChange} />;
      break;
    case "title_text":
      inputComponent = <TitleTextDisplay question={question} />;
      break;
    case "divider":
      inputComponent = <DividerDisplay />;
      break;
    default:
      inputComponent = <div className="mt-1 p-2 bg-[var(--color-light-surface)] rounded text-[var(--color-light-text-muted)]">Unknown question type</div>;
  }

  // Handle layout blocks differently
  if (question.question_type === 'title_text' || question.question_type === 'divider') {
    return (
      <div className="mb-4">
        {inputComponent}
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-light-card)] border border-[var(--color-light-border)] rounded-lg shadow-sm p-6 mb-4">
      {/* Question text */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-[var(--color-light-text-primary)] mb-2">
          {question.question_text}
          {question.is_required === 1 && (
            <div className="inline-flex items-center justify-center w-5 h-5 ml-6 rounded-full bg-[var(--color-black-200)]">
              <img 
                src={requireIcon} 
                alt="Required" 
                className="w-3 h-3"
                style={{ filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0.2)' }}
              />
            </div>
          )}
        </label>
      </div>

      {/* Question input */}
      {inputComponent}
    </div>
  );
};

export default QuestionBlock; 