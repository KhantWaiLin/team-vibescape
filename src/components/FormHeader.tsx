import React from "react";

interface FormHeaderProps {
  formTitle: string;
  onBackClick?: () => void;
  onSubmitClick?: () => void;
  onSaveDraftClick?: () => void;
  onPreviewClick?: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  formTitle,
  onBackClick,
  onPreviewClick,
  onSubmitClick,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Back button and form title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackClick}
              className="flex border border-gray-200 items-center gap-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm text-gray-500 ">Back to Dashboard</span>
            </button>
            <div className="flex gap-2">
              <h1 className="text-lg font-medium text-gray-900">{formTitle}</h1>
              <span className="flex text-xs rounded-4xl border w-fit border-gray-200 items-center justify-center px-4 text-gray-500 bg-gray-100">
                Draft
              </span>
            </div>
          </div>

          {/* Center - Form actions */}
          <div className="flex items-center space-x-2"></div>

          {/* Right side - Settings and user */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreviewClick}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={onPreviewClick}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Save to draft
            </button>
            <button
              onClick={onSubmitClick}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover"
            >
              Submit to Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
