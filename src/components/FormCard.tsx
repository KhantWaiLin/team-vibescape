import React from "react";
import { truncateWords } from "../utils/textUtils";
import { userGroupIcon, eyeIcon } from "../assets/icons/icons";
import StatusBadge from "./StatusBadge";
import type { FormStatus } from "../utils";

export interface FormCardProps {
  title: string;
  statusLabel?: FormStatus;
  statusColor?: string;
  description: string;
  category: string;
  editedText: string;
  maxWords?: number;
  participantsCount?: number;
  viewsCount?: number;
  showMetrics?: boolean;
  onEdit?: () => void;
  username?: string;
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  statusLabel,
  statusColor = "bg-[var(--color-green-100)] text-[var(--color-green-600)]",
  description,
  category,
  editedText,
  maxWords = 200,
  participantsCount,
  viewsCount,
  showMetrics = true,
  onEdit,
  username,
}) => {
  return (
    <div className="rounded-2xl border border-[var(--color-light-border)] bg-[var(--color-light-card)] p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-black-900)]">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {statusLabel ? <StatusBadge status={statusLabel} /> : null}
          {/* Edit button - only show for draft status (forms that can be edited) */}
          {statusLabel === 'draft' && onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[var(--color-blue-600)] bg-[var(--color-blue-50)] border border-[var(--color-blue-200)] rounded-md hover:bg-[var(--color-blue-100)] hover:border-[var(--color-blue-300)] transition-colors"
              title="Edit form"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-[var(--color-black-600)] leading-relaxed">
        {truncateWords(description, maxWords)}
      </p>
      <div className="mt-auto pt-5 flex flex-col gap-4 justify-start">
        <span className="rounded-full border w-fit border-[var(--color-light-border)] bg-[var(--color-light-surface)] px-3 py-1 text-xs text-[var(--color-black-600)]">
          {category ?? "General"}
        </span>

        <div className="flex justify-between">
          {/* User info */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-black-500)]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-green-600)] text-[var(--color-light-text-inverse)]">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <span>{editedText}</span>
          </div>
          {/* Metrics - only show if showMetrics is true and data exists */}
          {showMetrics &&
            (participantsCount !== undefined || viewsCount !== undefined) && (
              <div className="flex items-center gap-4 text-sm text-[var(--color-black-700)]">
                {/* Participants */}
                {participantsCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <img src={userGroupIcon} alt="participants" />
                    <span className="font-medium">{participantsCount}</span>
                  </div>
                )}

                {/* Views */}
                {viewsCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <img src={eyeIcon} alt="views" />
                    <span className="font-medium">{viewsCount}</span>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
