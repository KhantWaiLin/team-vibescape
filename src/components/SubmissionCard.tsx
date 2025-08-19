import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getStatusColor,
  getStatusLabel,
  type FormStatus,
} from "../utils/statusUtils";

export interface SubmissionCardProps {
  /** The ID of the form */
  formId: string;
  /** The title of the form */
  title: string;
  /** The current status of the submission */
  status: FormStatus;
  /** Description of the form */
  description: string;
  /** Number of fields in the form */
  fieldCount: number;
  /** Assignee information */
  assignee: {
    name: string;
    avatar?: string;
  };
  /** Category of the form */
  category: string;
  /** Optional click handler for the review button */
  onReview?: () => void;
  /** Optional click handler for approval */
  onApprove?: () => void;
  /** Optional click handler for rejection */
  onReject?: () => void;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * SubmissionCard Component
 *
 * A card component that displays form submission information with status,
 * assignee details, and action buttons for review, approval, and rejection.
 *
 * @example
 * ```tsx
 * <SubmissionCard
 *   formId="form-001"
 *   title="Webinar Sign-Up Form"
 *   status="pending"
 *   description="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
 *   fieldCount={4}
 *   assignee={{ name: "Sofia" }}
 *   category="Sales"
 *   onReview={() => console.log("Review clicked")}
 *   onApprove={() => console.log("Approve clicked")}
 *   onReject={() => console.log("Reject clicked")}
 * />
 * ```
 */
const SubmissionCard: React.FC<SubmissionCardProps> = ({
  formId,
  title,
  status,
  description,
  fieldCount,
  assignee,
  category,
  onReview,
  onApprove,
  onReject,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleReview = () => {
    if (onReview) {
      onReview();
    }
    // Navigate to form view page
    navigate(`/form/${formId}`);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-[var(--color-light-border)] shadow-sm p-6 ${className}`}
    >
      {/* Header with Title and Status */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-[var(--color-black-900)] pr-4">
          {title}
        </h3>
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            status
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-black-700)] mb-4 line-clamp-3">
        {description}
      </p>

      {/* Fields and Assignee Info */}
      <div className="flex justify-start w-full mb-6">
        <div className="flex flex-col w-full gap-3">
          <span className="text-sm text-[var(--color-black-600)]">
            {fieldCount} fields include:
          </span>

          {/* Assignee */}
          <div className="flex items-center w-full justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-green-100)] rounded-full flex items-center justify-center">
                {assignee.avatar ? (
                  <img
                    src={assignee.avatar}
                    alt={assignee.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-[var(--color-green-600)] text-sm font-semibold">
                    {assignee.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-[var(--color-black-700)]">
                {assignee.name}
              </span>
            </div>
            {/* Category */}
            <span className="inline-flex px-3 py-1 text-xs font-medium bg-[var(--color-gray-100)] text-[var(--color-gray-600)] rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Review Button */}
        <button
          onClick={handleReview}
          className="inline-flex items-center gap-2 bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Review
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-2 ml-auto">
          {onApprove && status !== "approved" && status !== "published" && (
            <button
              onClick={onApprove}
              className="w-8 h-8 bg-[var(--color-green-100)] hover:bg-[var(--color-green-200)] text-[var(--color-green-600)] rounded-full flex items-center justify-center transition-colors"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}

          {onReject && status !== "approved" && status !== "published" && (
            <button
              onClick={onReject}
              className="w-8 h-8 bg-[var(--color-red-100)] hover:bg-[var(--color-red-200)] text-[var(--color-red-600)] rounded-full flex items-center justify-center transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
