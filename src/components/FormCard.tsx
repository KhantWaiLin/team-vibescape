import React from "react";
import { truncateWords } from "../utils/textUtils";
import { userGroupIcon, eyeIcon } from "../assets/icons/icons";

export interface FormCardProps {
  title: string;
  statusLabel?: string;
  statusColor?: string;
  description: string;
  category: string;
  editedText: string;
  maxWords?: number;
  participantsCount?: number;
  viewsCount?: number;
  showMetrics?: boolean;
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
}) => {
  return (
    <div className="rounded-2xl border border-[var(--color-light-border)] bg-[var(--color-light-card)] p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-black-900)]">
          {title}
        </h3>
        {statusLabel ? (
          <span
            className={`rounded-full border border-[var(--color-light-border)] px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {statusLabel}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-[var(--color-black-600)] leading-relaxed">
        {truncateWords(description, maxWords)}
      </p>
      <div className="mt-auto pt-5 flex flex-col gap-4 justify-start">
        <span className="rounded-full border w-fit border-[var(--color-light-border)] bg-[var(--color-light-surface)] px-3 py-1 text-xs text-[var(--color-black-600)]">
          {category}
        </span>

        <div className="flex justify-between">
          {/* User info */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-black-500)]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-green-600)] text-[var(--color-light-text-inverse)]">
              U
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
