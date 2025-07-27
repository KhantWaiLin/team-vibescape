import React from "react";
import type { Question } from "../types";

interface FormBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question | null) => void;
  formTitle?: string;
  formDescription?: string;
}

// Question input components for builder mode
const TextInputBuilder = ({ question }: { question: Question }) => (
  <input
    type="text"
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
    placeholder={question.placeholder || "Enter your answer"}
    disabled
  />
);

const ParagraphInputBuilder = ({ question }: { question: Question }) => (
  <textarea
    className="mt-1 block w-full border shadow-sm rounded-lg border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 p-2"
    placeholder={question.placeholder || "Enter your answer"}
    rows={4}
    disabled
  />
);

const DropdownInputBuilder = ({ question }: { question: Question }) => (
  <select
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
    disabled
  >
    <option value="">Select...</option>
    {question.options &&
      JSON.parse(question.options).map((opt: string, idx: number) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
  </select>
);

const DateTimeInputBuilder = ({ question }: { question: Question }) => (
  <input
    type="datetime-local"
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
    title={question.placeholder || "Select date and time"}
    disabled
  />
);

const RadioGroupBuilder = ({ question }: { question: Question }) => (
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

const CheckboxGroupBuilder = ({ question }: { question: Question }) => (
  <div className="flex flex-col gap-2 mt-1">
    {question.options &&
      JSON.parse(question.options).map((opt: string, idx: number) => (
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

const RatingInputBuilder = ({ question }: { question: Question }) => (
  <input
    type="number"
    min={1}
    max={5}
    placeholder={question.placeholder || "Rate 1-5"}
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
    disabled
  />
);

const NumberInputBuilder = ({ question }: { question: Question }) => (
  <input
    type="number"
    placeholder={question.placeholder || "Enter a number"}
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-400 px-0 py-2"
    disabled
  />
);

const FileInputBuilder = ({ question }: { question: Question }) => (
  <input
    type="file"
    className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
    title={question.placeholder || "Choose file"}
    disabled
  />
);

const TitleTextBuilder = ({ question, onUpdate }: { question: Question; onUpdate: (question: Question) => void }) => (
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

const DividerBuilder = () => (
  <div className="mt-1">
    <hr className="border-gray-300" />
  </div>
);

const QuestionBuilderBlock = ({ 
  question, 
  onUpdate, 
  onDelete,
  isSelected,
  onSelect
}: { 
  question: Question; 
  onUpdate: (question: Question) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onSelect: (question: Question) => void;
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
        <input
          type="text"
          value={question.question_text}
          onChange={(e) => onUpdate({ ...question, question_text: e.target.value })}
          className="flex-1 text-lg font-medium text-gray-900 border-none focus:ring-0 focus:outline-none bg-transparent"
          placeholder="Enter your question"
          onClick={(e) => e.stopPropagation()}
        />
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

      {/* Question settings */}
      <div className="mt-4 pt-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!question.is_required}
              onChange={(e) => onUpdate({ ...question, is_required: e.target.checked ? 1 : 0 })}
              className="mr-2 text-blue-600 focus:ring-blue-400"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const FormBuilder: React.FC<FormBuilderProps> = ({ 
  questions, 
  onQuestionsChange, 
  selectedQuestion, 
  onQuestionSelect,
  formTitle = "Untitled Form",
  formDescription = ""
}) => {
  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    onQuestionsChange(updatedQuestions);
    
    // Update selected question if it's the one being updated
    if (selectedQuestion && selectedQuestion.id === updatedQuestion.id) {
      onQuestionSelect(updatedQuestion);
    }
  };

  const deleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    onQuestionsChange(updatedQuestions);
    
    // Clear selection if the deleted question was selected
    if (selectedQuestion && selectedQuestion.id === id) {
      onQuestionSelect(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="bg-white rounded-lg  border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {formTitle}
            </h1>
            {formDescription && (
              <p className="text-gray-600 leading-relaxed">
                {formDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Questions */}
      {questions.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">Click the buttons in the left sidebar to add questions</p>
        </div>
      ) : (
        questions.map((question) => (
          <QuestionBuilderBlock
            key={question.id}
            question={question}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
            isSelected={selectedQuestion?.id === question.id}
            onSelect={onQuestionSelect}
          />
        ))
      )}
    </div>
  );
};

export default FormBuilder; 