import React from "react";
import { userGroupIcon, eyeIcon } from "../assets/icons/icons";
import { truncateWords } from "../utils/textUtils";
import type { TemplateForm } from "../const/templateData";

export interface TemplateCardProps {
  template: TemplateForm;
  onUseTemplate: (template: TemplateForm) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onUseTemplate,
}) => {
  return (
    <div className="rounded-2xl border border-[var(--color-light-border)] bg-[var(--color-light-card)] p-6 shadow-sm h-full flex flex-col">
      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--color-black-900)] mb-3">
        {template.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-black-600)] leading-relaxed mb-4">
        {truncateWords(template.description, 10)}
      </p>

      {/* Fields and Users Info */}
      <div className="flex flex-col justify-start gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-black-700)]">
            {template.fieldsCount} fields include:
          </span>
        </div>

        {/* Category Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={userGroupIcon} alt="users" className="w-5 h-5" />
            <span className="text-sm font-medium text-[var(--color-black-900)]">
              {template.usersCount}
            </span>
          </div>

          <span className="rounded-full border border-[var(--color-light-border)] bg-[var(--color-light-surface)] px-3 py-1 text-xs text-[var(--color-black-600)]">
            {template.category ?? 'General'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center gap-3">
        <button 
          className="flex-1 bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-[var(--color-light-text-inverse)] px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          onClick={() => onUseTemplate(template)}
        >
          <span className="text-lg">+</span>
          Use Template
        </button>
        <button className="p-2 bg-[var(--color-light-surface)] hover:bg-[var(--color-black-100)] border border-[var(--color-light-border)] rounded-lg transition-colors">
          <img src={eyeIcon} alt="preview" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
