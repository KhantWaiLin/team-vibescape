import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";
import { API_ENDPOINTS, apiService } from "../services/api";
import toast from "react-hot-toast";

interface AIFormBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AIFormField {
  label: string;
  type: string;
  required: boolean;
}

interface AIFormResponse {
  code: number;
  message: string;
  data: {
    title: string;
    description: string;
    fields: AIFormField[];
  };
}

const AIFormBuilderModal: React.FC<AIFormBuilderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formDescription, setFormDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const navigate = useNavigate();

  // 20 common form question texts for suggestions
  const commonFormSuggestions = [
    "Create a customer feedback survey for our restaurant",
    "Build an event registration form for a tech conference",
    "Make a job application form for software developers",
    "Design a patient intake form for a medical clinic",
    "Create a workshop signup form for cooking classes",
    "Build a membership application for a fitness club",
    "Make a product review form for e-commerce",
    "Design a volunteer registration for community events",
    "Create a course enrollment form for online learning",
    "Build a service request form for home maintenance",
    "Make a feedback form for customer support",
    "Design a survey for employee satisfaction",
    "Create a booking form for appointment scheduling",
    "Build a registration form for webinars",
    "Make a contact form for business inquiries",
    "Design a feedback form for product testing",
    "Create a signup form for newsletters",
    "Build a registration form for workshops",
    "Make a feedback form for service quality",
    "Design a survey for market research",
  ];

  const handleNewSuggestion = () => {
    const randomIndex = Math.floor(
      Math.random() * commonFormSuggestions.length
    );
    setFormDescription(commonFormSuggestions[randomIndex]);
  };

  const handleBuildForm = async () => {
    if (!formDescription.trim()) {
      toast.error("Please enter a form description");
      return;
    }

    setIsGenerating(true);
    try {
      // Step 1: Generate AI form structure
      const aiResponse = await apiService.post<AIFormResponse>(
        API_ENDPOINTS.AI.GENERATE, // Replace with your actual AI endpoint
        { prompt: formDescription },
        apiService.getAuthHeaders()
      );

      if (aiResponse.code !== 200) {
        throw new Error(aiResponse.message || "Failed to generate form");
      }

      const { title, description, fields } = aiResponse.data;

      // Step 2: Save the form first
      const formResponse: any = await apiService.post(
        API_ENDPOINTS.FORMS.CREATE,
        { title, description },
        apiService.getAuthHeaders()
      );
      // Step 3: Navigate to CreateForm with the generated data

      navigate("/create-form", {
        state: {
          data: {
            id: formResponse?.data?.id,
            title,
            description,
            response: formResponse,
            questions: fields.map((field, index) => ({
              id: Date.now() + index, // Temporary ID for client-side
              question_text: field.label,
              question_type: field.type,
              is_required: field.required ? 1 : 0,
              options: null,
              placeholder: `Enter ${field.label.toLowerCase()}`,
              order: index + 1,
            })),
          },
        },
      });

      toast.success("AI form generated and saved successfully!");
      onClose();
    } catch (error: any) {
      console.error("Failed to generate AI form:", error);
      toast.error(
        error.message || "Failed to generate AI form. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PopupModal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      maxHeight="60vh"
      showHeader={false}
    >
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
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Describe your form (eg. Make a Doctor appointment form)"
              className="w-full h-32 p-4 rounded-lg resize-none focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] placeholder-[var(--color-black-400)] text-[var(--color-black-900)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleNewSuggestion}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--color-light-border)] bg-white text-[var(--color-black-700)] rounded-lg hover:bg-[var(--color-light-surface)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              New suggestion
            </button>

            <button
              onClick={handleBuildForm}
              disabled={!formDescription.trim() || isGenerating}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors font-medium ${
                formDescription.trim() && !isGenerating
                  ? "bg-[var(--color-green-600)] text-white hover:bg-[var(--color-green-700)]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </PopupModal>
  );
};

export default AIFormBuilderModal;
