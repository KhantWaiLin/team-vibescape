import React, { useState } from "react";

interface FormReviewSidebarProps {
  formData: {
    title: string;
    category?: string;
    description?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onFormUpdate: (updates: Partial<FormReviewSidebarProps['formData']>) => void;
  isEditing?: boolean;
}

const FormReviewSidebar: React.FC<FormReviewSidebarProps> = ({
  formData,
  onFormUpdate,
  isEditing = false,
}) => {
  const [localFormData, setLocalFormData] = useState(formData);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updatedData = { ...localFormData, [field]: value };
    setLocalFormData(updatedData);
    onFormUpdate(updatedData);
  };

  const categories = [
    "General",
    "Business",
    "Education", 
    "Healthcare",
    "Technology",
    "Marketing",
    "Customer Service",
    "Human Resources",
    "Finance",
    "Legal"
  ];

  return (
    <div className="bg-white border-r border-[var(--color-light-border)] shadow-sm p-6 w-80 h-screen">
      <div className="space-y-6">
        {/* Form Title */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-black-900)] mb-2">
            Form Title
          </label>
          <input
            type="text"
            value={localFormData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-[var(--color-light-border)] rounded-lg bg-white text-[var(--color-black-700)] placeholder-[var(--color-black-400)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-[var(--color-light-bg)] disabled:cursor-not-allowed"
            placeholder="Enter form title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-black-900)] mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={localFormData.category || ""}
              onChange={(e) => handleInputChange('category', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-[var(--color-light-border)] rounded-lg bg-white text-[var(--color-black-700)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-[var(--color-light-bg)] disabled:cursor-not-allowed appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-[var(--color-black-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-black-900)] mb-2">
            Description
          </label>
          <textarea
            value={localFormData.description || ""}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3 border border-[var(--color-light-border)] rounded-lg bg-white text-[var(--color-black-700)] placeholder-[var(--color-black-400)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-[var(--color-light-bg)] disabled:cursor-not-allowed resize-none"
            placeholder="Enter form description"
          />
        </div>

        {/* Form Status Info */}
        {/* <div className="pt-4 border-t border-[var(--color-light-border)]">
          <h3 className="text-sm font-semibold text-[var(--color-black-900)] mb-3">
            Form Information
          </h3>
          <div className="space-y-2 text-sm text-[var(--color-black-600)]">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-[var(--color-black-700)]">
                {formData.status || "Draft"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Created:</span>
              <span className="font-medium text-[var(--color-black-700)]">
                {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium text-[var(--color-black-700)]">
                {formData.updatedAt ? new Date(formData.updatedAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FormReviewSidebar;