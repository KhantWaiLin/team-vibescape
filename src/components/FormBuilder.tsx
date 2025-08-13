import React from "react";
import type { Question } from "../types";
import QuestionBuilderBlock from "./form-builder/QuestionBuilderBlock";

interface FormBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question | null) => void;
  formTitle?: string;
  formDescription?: string;
}

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