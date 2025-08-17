import React, { useState } from "react";
import type { Question } from "../../types";
import QuestionBlock from "./QuestionBlock";

interface FormViewerProps {
  formTitle: string;
  formDescription?: string;
  questions: Question[];
  onSubmit?: (formData: Record<number | string, any>) => void;
  onBack?: () => void;
  isPreview?: boolean;
  submitButtonText?: string;
}





const FormViewer: React.FC<FormViewerProps> = ({ 
  formTitle, 
  formDescription, 
  questions, 
  onSubmit,
  onBack,
  isPreview = false,
  submitButtonText = "Submit Form"
}) => {
  const [formData, setFormData] = useState<Record<number | string, any>>({});

  const handleInputChange = (questionId: number | string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      {onBack && (
        <div className="bg-[var(--color-light-card)] shadow-sm border-b border-[var(--color-light-border)]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex border border-[var(--color-light-border)] items-center gap-2 p-2 rounded-md text-[var(--color-light-text-muted)] hover:text-[var(--color-light-text-secondary)] hover:bg-[var(--color-light-surface)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm text-[var(--color-light-text-muted)]">
                  {isPreview ? "Back to Edit" : "Back"}
                </span>
              </button>
              {isPreview && (
                <div className="flex gap-2">
                  <h1 className="text-lg font-medium text-[var(--color-light-text-primary)]">Preview Mode</h1>
                  <span className="flex text-xs rounded-4xl border w-fit border-[var(--color-light-border)] items-center justify-center px-4 text-[var(--color-light-text-muted)] bg-[var(--color-light-surface)]">
                    Preview
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Header */}
          <div className="bg-[var(--color-light-card)] rounded-lg shadow-sm border border-[var(--color-light-border)] p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--color-light-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-[var(--color-light-text-primary)] mb-2">
                  {formTitle}
                </h1>
                {formDescription && (
                  <p className="text-[var(--color-light-text-secondary)] leading-relaxed">
                    {formDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Questions */}
          {questions.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[var(--color-light-border)] rounded-lg text-center">
              <p className="text-[var(--color-light-text-muted)]">No questions added to this form yet</p>
            </div>
          ) : (
            questions.map((question, index) => (
              <QuestionBlock 
                key={question.id ?? `${question.question_type}-${index}`}
                question={question}
                value={formData[question.id ?? `${question.question_type}-${index}`]}
                onChange={(value) => handleInputChange(question.id ?? `${question.question_type}-${index}`, value)}
              />
            ))
          )}

          {/* Submit Button */}
          <div className="bg-[var(--color-light-card)] rounded-lg shadow-sm border border-[var(--color-light-border)] p-6">
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-[var(--color-light-text-inverse)] bg-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormViewer; 