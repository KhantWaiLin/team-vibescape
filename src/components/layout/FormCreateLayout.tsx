import React, { useState } from "react";
import FormBuilderSidebar from "../FormBuilderSidebar";

interface FormCreateLayoutProps {
  children: React.ReactNode;
}

const FormCreateLayout: React.FC<FormCreateLayoutProps> = ({ children }) => {
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
    // TODO: Implement question addition logic
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Header - Fixed full width */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side - Back button and form title */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
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
              </button>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-medium text-gray-900">
                  Untitled form
                </h1>
                <button className="p-1 rounded text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Center - Form actions */}
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Preview
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Send
              </button>
            </div>

            {/* Right side - Settings and user */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Question types and tools */}
      <FormBuilderSidebar
        isOpen={leftSidebarOpen}
        onAddQuestion={handleAddQuestion}
      />

      {/* Right Sidebar - Form settings and properties */}
      <div
        className={`fixed top-[74px] right-0 h-[calc(100vh-74px)] z-30 transition-all duration-300 ${
          rightSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-80 bg-white shadow-lg border-l border-gray-200 h-full overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Form settings
            </h3>
            <div className="space-y-4">
              {/* Settings sections */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  General
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Form title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Untitled form"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Form description"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Collect email addresses
                    </span>
                    <button className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Limit to 1 response
                    </span>
                    <button className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
