import React from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiEye, HiLink, HiGlobe } from "react-icons/hi";
import toast from "react-hot-toast";

interface SubmissionInsightLayoutProps {
  title?: string;
  status?: string;
  formData?: any; // Add formData to access url_token
  onPreview?: () => void;
  onBackToDashboard?: () => void;
  children: ReactNode;
}

const SubmissionInsightLayout: React.FC<SubmissionInsightLayoutProps> = ({
  title = "Conference Attendee Registration Form",
  status = "Published",
  formData, // Add formData to destructuring
  onPreview,
  onBackToDashboard,
  children,
}) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    if (onBackToDashboard) {
      onBackToDashboard();
    } else {
      navigate("/");
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    }
  };

  // Handle copy URL functionality
  const handleCopyUrl = async () => {
    try {
      // Get the url_token from the form data
      const urlToken = formData?.form?.url_token;

      if (urlToken) {
        // Construct the public form URL
        const publicFormUrl = `${window.location.origin}/public/form/${urlToken}`;
        await navigator.clipboard.writeText(publicFormUrl);
        toast.success("Public form URL copied to clipboard!");
      } else {
        toast.error("URL token not found");
      }
    } catch (err) {
      toast.error("Failed to copy URL to clipboard");
    }
  };

  return (
    <div className="w-full">
      {/* Header Bar */}
      <div className="bg-white border-t-2 border-b-2 border-[var(--color-blue-200)] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Back Button */}
          <div className="flex items-center">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-light-border)] rounded-lg text-[var(--color-black-700)] hover:bg-[var(--color-light-surface)] transition-colors"
            >
              <HiChevronLeft className="w-4 h-4" />
              Back to dashboard
            </button>
          </div>

          {/* Center Section - Title and Status */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[var(--color-black-900)]">
              {title}
            </h1>

            {/* Status Tag */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-green-100)] text-[var(--color-green-700)] rounded-lg text-sm font-medium">
              <HiGlobe className="w-4 h-4" />
              {status}
            </div>

            {/* Dashed Line */}
            <div className="w-16 h-px border-t-2 border-dashed border-[var(--color-light-border)]"></div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreview}
              className="px-4 py-2 bg-white border border-[var(--color-light-border)] rounded-lg text-[var(--color-black-700)] hover:bg-[var(--color-light-surface)] transition-colors"
            >
              Preview
            </button>

            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-light-border)] rounded-lg text-[var(--color-black-700)] hover:bg-[var(--color-light-surface)] transition-colors"
            >
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default SubmissionInsightLayout;
