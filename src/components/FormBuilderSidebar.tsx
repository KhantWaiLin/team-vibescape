import React from "react";
import QuestionTypeButton from "./QuestionTypeButton";
import { layoutBlocks, questionsTypes } from "../const/const";

interface FormBuilderSidebarProps {
  isOpen: boolean;
  onAddQuestion: (questionType: string) => void;
  formTitle: string;
  formDescription: string;
  onFormTitleChange: (title: string) => void;
  onFormDescriptionChange: (description: string) => void;
}

const FormBuilderSidebar: React.FC<FormBuilderSidebarProps> = ({
  isOpen,
  onAddQuestion,
  formTitle,
  formDescription,
  onFormTitleChange,
  onFormDescriptionChange,
}) => {
  return (
    <div
      className={`fixed top-[74px] left-0 h-[calc(100vh-74px)] z-30 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Title
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => onFormTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter form title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Description
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => onFormDescriptionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter form description (optional)"
              rows={3}
            />
          </div>
          <div className="border-b border-gray-200 mb-6"></div>
          <h3 className="text-sm font-medium text-gray-900 mb-0">
            Add Fields
          </h3>
          <span className="text-xs text-gray-500">
            Click to add form fields
          </span>
          <h4 className="text-xs font-bold text-gray-500 tracking-wide mt-6 mb-2">
            Question
          </h4>
          <div className="space-y-2">
            {questionsTypes.map((questionType, index) => {
              const variants = [
                "blue",
                "green",
                "purple",
                "orange",
                "red",
                "gray",
              ];
              const variant = variants[index % variants.length];

              return (
                <QuestionTypeButton
                  key={questionType.question_type}
                  icon={
                    <img
                      src={questionType.icon}
                      alt={questionType.label}
                      className="w-4 h-4"
                    />
                  }
                  label={questionType.label}
                  variant={variant as any}
                  onClick={() =>
                    onAddQuestion(questionType.question_type)
                  }
                />
              );
            })}
          </div>
          <h4 className="text-xs font-bold text-gray-500 tracking-wide mt-6 mb-2">
            Layout Blocks
          </h4>
          <div className="space-y-2">
            {layoutBlocks.map((questionType, index) => {
              const variants = [
                "blue",
                "green",
                "purple",
                "orange",
                "red",
                "gray",
              ];
              const variant = variants[index % variants.length];

              return (
                <QuestionTypeButton
                  key={questionType.question_type}
                  icon={
                    <img
                      src={questionType.icon}
                      alt={questionType.label}
                      className="w-4 h-4"
                    />
                  }
                  label={questionType.label}
                  variant={variant as any}
                  onClick={() =>
                    onAddQuestion(questionType.question_type)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderSidebar; 