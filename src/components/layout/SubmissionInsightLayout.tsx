import React from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiEye, HiLink, HiGlobe } from "react-icons/hi";

interface SubmissionInsightLayoutProps {
  title?: string;
  status?: string;
  onPreview?: () => void;
  onShareLink?: () => void;
  onBackToDashboard?: () => void;
  children: ReactNode;
}

const SubmissionInsightLayout: React.FC<SubmissionInsightLayoutProps> = ({
  title = "Conference Attendee Registration Form",
  status = "Published",
  onPreview,
  onShareLink,
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

  const handleShareLink = () => {
    if (onShareLink) {
      onShareLink();
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
              onClick={handleShareLink}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-light-border)] rounded-lg text-[var(--color-black-700)] hover:bg-[var(--color-light-surface)] transition-colors"
            >
              <HiLink className="w-4 h-4" />
              Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default SubmissionInsightLayout;
