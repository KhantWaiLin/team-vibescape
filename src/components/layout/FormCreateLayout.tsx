import React, { useState } from "react";
import FormBuilderSidebar from "../FormBuilderSidebar";
import FormSettingsSidebar from "../FormSettingsSidebar";
import FormHeader from "../FormHeader";

interface Question {
  id: number;
  question_text: string;
  question_type: string;
  is_required: number;
  options: string | null;
  placeholder?: string;
  order?: number;
}

interface FormCreateLayoutProps {
  children: React.ReactNode;
  questions?: Question[];
  onQuestionsChange?: (questions: Question[]) => void;
  selectedQuestion?: Question | null;
  onQuestionSelect?: (question: Question | null) => void;
  formTitle?: string;
  formDescription?: string;
  onFormTitleChange?: (title: string) => void;
  onFormDescriptionChange?: (description: string) => void;
  onPreviewClick?: () => void;
}

const FormCreateLayout: React.FC<FormCreateLayoutProps> = ({ 
  children, 
  questions = [], 
  onQuestionsChange,
  selectedQuestion = null,
  onQuestionSelect,
  formTitle = "Untitled Form",
  formDescription = "",
  onFormTitleChange,
  onFormDescriptionChange,
  onPreviewClick
}) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleAddQuestion = (questionType: string) => {
    console.log(`Adding question type: ${questionType}`);
    if (onQuestionsChange) {
      const newQuestion: Question = {
        id: Date.now(), // Simple ID generation
        question_text: `New ${questionType} question`,
        question_type: questionType,
        is_required: 0,
        placeholder: `Enter your ${questionType.replace('_', ' ')}`,
        options: questionType === 'dropdown' || questionType === 'multiple_choice' || questionType === 'checkboxes' 
          ? '["Option 1", "Option 2", "Option 3"]' 
          : null,
        order: questions.length
      };
      onQuestionsChange([...questions, newQuestion]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Header - Fixed full width */}
      <FormHeader
        formTitle={formTitle}
        onBackClick={() => console.log('Back clicked')}
        onPreviewClick={onPreviewClick || (() => console.log('Preview clicked'))}
        onSubmitClick={() => console.log('Submit to Admin clicked')}
        onSaveDraftClick={() => console.log('Save draft clicked')}
      />

      {/* Left Sidebar - Question types and tools */}
      <FormBuilderSidebar
        isOpen={leftSidebarOpen}
        onAddQuestion={handleAddQuestion}
        formTitle={formTitle}
        formDescription={formDescription}
        onFormTitleChange={onFormTitleChange || (() => {})}
        onFormDescriptionChange={onFormDescriptionChange || (() => {})}
      />

      {/* Right Sidebar - Question settings */}
      <FormSettingsSidebar
        isOpen={rightSidebarOpen}
        selectedQuestion={selectedQuestion}
        onQuestionUpdate={(updatedQuestion) => {
          if (onQuestionsChange && onQuestionSelect) {
            const updatedQuestions = questions.map(q => 
              q.id === updatedQuestion.id ? updatedQuestion : q
            );
            onQuestionsChange(updatedQuestions);
            onQuestionSelect(updatedQuestion);
          }
        }}
      />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          leftSidebarOpen ? "ml-64" : "ml-0"
        } ${rightSidebarOpen ? "mr-80" : "mr-0"}`}
      >
        {/* Main content - With top padding for fixed header */}
        <main className="flex-1 overflow-y-auto p-6 mt-[74px]">{children}</main>
      </div>

      {/* Toggle buttons for sidebars */}
      <button
        onClick={toggleLeftSidebar}
        className={`fixed top-[90px] z-50 p-2 bg-white border border-gray-200 rounded-r-lg shadow-md hover:bg-gray-50 transition-all duration-300 ${
          leftSidebarOpen ? "left-64" : "left-0"
        }`}
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={leftSidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>

      <button
        onClick={toggleRightSidebar}
        className={`fixed top-[90px] z-50 p-2 bg-white border border-gray-200 rounded-l-lg shadow-md hover:bg-gray-50 transition-all duration-300 ${
          rightSidebarOpen ? "right-80" : "right-0"
        }`}
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={rightSidebarOpen ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
          />
        </svg>
      </button>
    </div>
  );
};

export default FormCreateLayout;
