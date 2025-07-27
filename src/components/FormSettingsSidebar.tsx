import React from "react";
import type { FormSettingsSidebarProps } from "../types";

const FormSettingsSidebar: React.FC<FormSettingsSidebarProps> = ({
  isOpen,
  selectedQuestion,
  onQuestionUpdate,
}) => {

  const handleAddOption = () => {
    if (!selectedQuestion) return;

    const currentOptions = selectedQuestion.options 
      ? JSON.parse(selectedQuestion.options) 
      : [];
    
    const updatedOptions = [...currentOptions, `Option ${currentOptions.length + 1}`];
    const updatedQuestion = {
      ...selectedQuestion,
      options: JSON.stringify(updatedOptions)
    };
    
    onQuestionUpdate(updatedQuestion);
  };

  const handleRemoveOption = (optionIndex: number) => {
    if (!selectedQuestion) return;

    const currentOptions = selectedQuestion.options 
      ? JSON.parse(selectedQuestion.options) 
      : [];
    
    const updatedOptions = currentOptions.filter((_: string, index: number) => index !== optionIndex);
    const updatedQuestion = {
      ...selectedQuestion,
      options: JSON.stringify(updatedOptions)
    };
    
    onQuestionUpdate(updatedQuestion);
  };

  const handleOptionChange = (optionIndex: number, newValue: string) => {
    if (!selectedQuestion) return;

    const currentOptions = selectedQuestion.options 
      ? JSON.parse(selectedQuestion.options) 
      : [];
    
    const updatedOptions = currentOptions.map((option: string, index: number) => 
      index === optionIndex ? newValue : option
    );
    
    const updatedQuestion = {
      ...selectedQuestion,
      options: JSON.stringify(updatedOptions)
    };
    
    onQuestionUpdate(updatedQuestion);
  };

  const renderOptionsSection = () => {
    if (!selectedQuestion) return null;

    const needsOptions = ['dropdown', 'multiple_choice', 'checkboxes'].includes(selectedQuestion.question_type);
    if (!needsOptions) return null;

    const options = selectedQuestion.options ? JSON.parse(selectedQuestion.options) : [];

    return (
      <div className="mb-6">
        <h4 className="text-sm font-bold text-green-800 mb-3">
          Options
        </h4>
        <div className="space-y-3">
          {options.map((option: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter option"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md border border-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={handleAddOption}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Options</span>
          </button>
        </div>
      </div>
    );
  };



  return (
    <div
      className={`fixed top-[74px] right-0 h-[calc(100vh-74px)] z-30 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-80 bg-white shadow-lg border-l border-gray-200 h-full overflow-y-auto">
        <div className="p-4">
          {selectedQuestion ? (
            <>
              <h3 className="text-lg font-bold text-green-800 mb-6">
                Fields Setting
              </h3>
              
              {/* Title Section */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-green-800 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={selectedQuestion.question_text}
                  onChange={(e) => onQuestionUpdate({
                    ...selectedQuestion,
                    question_text: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="First Name"
                />
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-green-800 mb-2">
                  Description <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  rows={3}
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Placeholder Text Section */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-green-800 mb-2">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={selectedQuestion.placeholder || ""}
                  onChange={(e) => onQuestionUpdate({
                    ...selectedQuestion,
                    placeholder: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter placeholder text"
                />
              </div>

              {/* Required Field Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-green-800">Required field</span>
                  <button
                    onClick={() => onQuestionUpdate({
                      ...selectedQuestion,
                      is_required: selectedQuestion.is_required ? 0 : 1
                    })}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      selectedQuestion.is_required ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      selectedQuestion.is_required ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Options Section - Only for specific question types */}
              {renderOptionsSection()}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Select a question to edit its settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSettingsSidebar; 