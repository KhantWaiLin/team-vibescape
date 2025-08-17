import React, { useState } from "react";
import { PopupModal, LoadingSpinner } from "./index";

interface NewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
}

const NewFormModal: React.FC<NewFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (formTitle.trim() && formDescription.trim()) {
      setIsLoading(true);
      try {
        await onSubmit(formTitle.trim(), formDescription.trim());
        // Reset form and close modal
        setFormTitle("");
        setFormDescription("");
        onClose();
      } catch (error) {
        console.error("Error creating form:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setFormTitle("");
    setFormDescription("");
    onClose();
  };

  return (
    <PopupModal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      showHeader={true}
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Create New Form
          </h2>
          <p className="text-gray-600">
            Enter the basic details for your new form
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="formTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Form Title *
            </label>
            <input
              type="text"
              id="formTitle"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter form title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="formDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Form Description *
            </label>
            <textarea
              id="formDescription"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Enter form description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formTitle.trim() || !formDescription.trim() || isLoading}
            className="px-4 py-2 bg-[var(--color-green-600)] text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                Creating...
              </>
            ) : (
              "Create Form"
            )}
          </button>
        </div>
      </div>
    </PopupModal>
  );
};

export default NewFormModal;
