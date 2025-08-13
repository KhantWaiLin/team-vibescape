import React from "react";
import type { Question } from "../types";
import { FormViewer } from "./form-display";

interface FormPreviewProps {
  formTitle: string;
  formDescription?: string;
  questions: Question[];
  onBackToEdit: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ 
  formTitle, 
  formDescription, 
  questions, 
  onBackToEdit 
}) => {
  const handleSubmit = (formData: Record<number, any>) => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <FormViewer
      formTitle={formTitle}
      formDescription={formDescription}
      questions={questions}
      onSubmit={handleSubmit}
      onBack={onBackToEdit}
      isPreview={true}
      submitButtonText="Submit Form"
    />
  );
};

export default FormPreview; 