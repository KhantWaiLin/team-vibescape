import React from "react";
import type { Question } from "../../types";
import TextInputBuilder from "./inputs/TextInputBuilder";
import ParagraphInputBuilder from "./inputs/ParagraphInputBuilder";
import DropdownInputBuilder from "./inputs/DropdownInputBuilder";
import DateTimeInputBuilder from "./inputs/DateTimeInputBuilder";
import RadioGroupBuilder from "./inputs/RadioGroupBuilder";
import CheckboxGroupBuilder from "./inputs/CheckboxGroupBuilder";
import RatingInputBuilder from "./inputs/RatingInputBuilder";
import NumberInputBuilder from "./inputs/NumberInputBuilder";
import FileInputBuilder from "./inputs/FileInputBuilder";
import TitleTextBuilder from "./inputs/TitleTextBuilder";
import DividerBuilder from "./inputs/DividerBuilder";
import { requireIcon } from "../../assets/icons/icons";

interface QuestionBuilderBlockProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onSelect: (question: Question) => void;
}

const QuestionBuilderBlock: React.FC<QuestionBuilderBlockProps> = ({ 
  question, 
  onUpdate, 
  onDelete,
  isSelected,
  onSelect
}) => {
  let inputComponent = null;
  
  switch (question.question_type) {
    case "text":
      inputComponent = <TextInputBuilder question={question} />;
      break;
    case "paragraph":
      inputComponent = <ParagraphInputBuilder question={question} />;
      break;
    case "dropdown":
      inputComponent = <DropdownInputBuilder question={question} />;
      break;
    case "datetime":
      inputComponent = <DateTimeInputBuilder question={question} />;
      break;
    case "multiple_choice":
      inputComponent = <RadioGroupBuilder question={question} />;
      break;
    case "checkboxes":
      inputComponent = <CheckboxGroupBuilder question={question} />;
      break;
    case "rating":
      inputComponent = <RatingInputBuilder question={question} />;
      break;
    case "number":
      inputComponent = <NumberInputBuilder question={question} />;
      break;
    case "file":
      inputComponent = <FileInputBuilder question={question} />;
      break;
    case "title_text":
      inputComponent = <TitleTextBuilder question={question} onUpdate={onUpdate} />;
      break;
    case "divider":
      inputComponent = <DividerBuilder />;
      break;
    default:
      inputComponent = <div className="mt-1 p-2 bg-gray-100 rounded text-gray-500">Unknown question type</div>;
  }

  // Handle layout blocks differently
  if (question.question_type === 'title_text' || question.question_type === 'divider') {
    return (
      <div 
        className={`bg-white border rounded-lg shadow-sm p-6 mb-4 relative group cursor-pointer transition-all ${
          isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onSelect(question)}
      >
        {/* Layout block header with edit controls */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {question.question_type === 'title_text' && 'Title Text'}
          </span>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(question.id);
              }}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Layout block content */}
        {inputComponent}
      </div>
    );
  }

  return (
    <div 
      className={`bg-white border rounded-lg shadow-sm p-6 mb-4 relative group cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(question)}
    >
      {/* Question header with edit controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 flex items-center">
          <span className="text-lg font-medium text-gray-900">
            {question.question_text}
          </span>
          {question.is_required === 1 && (
            <div className="inline-flex items-center justify-center w-5 h-5 ml-2 rounded-full bg-[var(--color-black-200)]">
              <img 
                src={requireIcon} 
                alt="Required" 
                className="w-3 h-3"
                style={{ filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0.2)' }}
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(question.id);
            }}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Question input preview */}
      {inputComponent}
    </div>
  );
};

export default QuestionBuilderBlock; 