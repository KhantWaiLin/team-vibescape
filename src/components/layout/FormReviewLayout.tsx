import React from "react";
import type { ReactNode } from "react";
import FormReviewSidebar from "./FormReviewSidebar";
import { LoadingSpinner } from "../index";

interface FormReviewLayoutProps {
  children: ReactNode;
  formData: any;
  onFormUpdate: (updates: Partial<FormReviewLayoutProps["formData"]>) => void;
  onBack: () => void;
  onApprove: () => void;
  onReject: () => void;
  isProcessing?: boolean;
  isEditing?: boolean;
}

const FormReviewLayout: React.FC<FormReviewLayoutProps> = ({
  children,
  formData,
  onFormUpdate,
  onBack,
  onApprove,
  onReject,
  isProcessing = false,
  isEditing = false,
}) => {
  return (
    <div className="min-h-screen bg-[var(--color-light-bg)]">
      {/* Global Header */}
      <div className="bg-white border-b border-[var(--color-light-border)] shadow-sm">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-cenr justify-between">
            {/* Left Side - Title and Navigation */}
            <div className="flex justify-start items-center gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-[var(--color-black-600)] hover:text-[var(--color-black-800)] transition-colors bg-[var(--color-light-bg)] hover:bg-[var(--color-light-border)] px-4 py-2 rounded-lg"
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
                    Back to dashboard
                  </button>
                  <span className="text-[var(--color-black-400)]">/</span>
                  <span className="text-[var(--color-black-700)] font-medium">
                    {formData.title}
                  </span>
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Under Review
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onApprove}
                disabled={
                  isProcessing ||
                  formData.status === "approved" ||
                  formData.status === "published"
                }
                className="inline-flex items-center gap-2 bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] disabled:bg-[var(--color-gray-400)] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" />
                ) : (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {isProcessing ? "Processing..." : "Approve Submission"}
              </button>

              <button
                onClick={onReject}
                disabled={
                  isProcessing ||
                  formData.status === "rejected"
                }
                className="inline-flex items-center gap-2 bg-[var(--color-red-600)] hover:bg-[var(--color-red-700)] disabled:bg-[var(--color-gray-400)] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" />
                ) : (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  )}
                {isProcessing ? "Processing..." : "Reject Submission"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex h-[calc(100vh-70px)]">
        {/* Left Side - Sidebar (Full Height, No Spacing) */}
        <div className="flex-shrink-0">
          <FormReviewSidebar
            formData={formData}
            onFormUpdate={onFormUpdate}
            isEditing={isEditing}
          />
        </div>

        {/* Right Side - Main Content (Centered, Scrollable) */}
        <div className="flex-1 flex justify-center overflow-y-auto">
          <div className="max-w-4xl w-full p-6">
            <div className="bg-white rounded-2xl border border-[var(--color-light-border)] shadow-sm overflow-hidden">
              {/* Form Content */}
              <div className="p-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormReviewLayout;
