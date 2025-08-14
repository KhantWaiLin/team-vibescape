import React from 'react';
import PopupModal from './PopupModal';

interface AIFormBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIFormBuilderModal: React.FC<AIFormBuilderModalProps> = ({ isOpen, onClose }) => {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose} size="3xl" maxHeight="60vh" showHeader={false}> 
      <div className="space-y-6 p-6">
        {/* Header with Beta tag */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-[var(--color-green-600)]">
              Build Forms with AI
            </h2>
            <span className="px-3 py-1 bg-[var(--color-light-surface)] text-[var(--color-black-600)] text-xs font-medium rounded-full border border-[var(--color-light-border)]">
              Beta
            </span>
          </div>
          <p className="text-[var(--color-green-600)] text-sm">
            No need to drag and drop - just tell us what you need
          </p>
        </div>

        {/* Input Area */}
        <div className="flex flex-col gap-4 border-2 p-4 border-[var(--color-green-200)]">
          <div className="space-y-4">
            <textarea
              placeholder="Describe your form (eg. Make a Doctor appointment form)"
              className="w-full h-32 p-4 rounded-lg resize-none focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] placeholder-[var(--color-black-400)] text-[var(--color-black-900)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-light-border)] bg-white text-[var(--color-black-700)] rounded-lg hover:bg-[var(--color-light-surface)] transition-colors">
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              New suggestion
            </button>

            <button className="flex items-center gap-2 px-6 py-2 bg-[var(--color-green-600)] text-white rounded-lg hover:bg-[var(--color-green-700)] transition-colors font-medium">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Build Form
            </button>
          </div>
        </div>
      </div>
    </PopupModal>
  );
};

export default AIFormBuilderModal;
