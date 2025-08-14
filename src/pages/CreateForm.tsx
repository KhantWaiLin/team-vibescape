import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import type { Question } from "../types";
import { FormCreateLayout } from "../components/layout";
import FormPreview from "../components/FormPreview";

const CreateForm = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Check for template data from navigation state
  useEffect(() => {
    const templateData = location.state?.templateData;
    const isFromTemplate = location.state?.isFromTemplate;

    if (isFromTemplate && templateData) {
      // Convert template questions to the format expected by FormBuilder
      const templateQuestions: Question[] = templateData.questions.map((q: any) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        is_required: q.is_required,
        options: q.options,
      }));

      // Set form data from template
      setQuestions(templateQuestions);
      setFormTitle(templateData.title);
      setFormDescription(templateData.description);
      
      // Clear navigation state to prevent re-loading on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };

  const handleQuestionSelect = (question: Question | null) => {
    setSelectedQuestion(question);
  };

  const handlePreviewClick = () => {
    setIsPreviewMode(true);
  };

  const handleBackToEdit = () => {
    setIsPreviewMode(false);
  };

  // If in preview mode, show the preview component
  if (isPreviewMode) {
    return (
      <FormPreview
        formTitle={formTitle}
        formDescription={formDescription}
        questions={questions}
        onBackToEdit={handleBackToEdit}
      />
    );
  }

  // Otherwise show the form builder
  return (
    <FormCreateLayout
      questions={questions}
      onQuestionsChange={handleQuestionsChange}
      selectedQuestion={selectedQuestion}
      onQuestionSelect={handleQuestionSelect}
      formTitle={formTitle}
      formDescription={formDescription}
      onFormTitleChange={setFormTitle}
      onFormDescriptionChange={setFormDescription}
      onPreviewClick={handlePreviewClick}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form Builder Component */}
          <FormBuilder
            questions={questions}
            onQuestionsChange={handleQuestionsChange}
            selectedQuestion={selectedQuestion}
            onQuestionSelect={handleQuestionSelect}
            formTitle={formTitle}
            formDescription={formDescription}
          />
        </div>
      </div>
    </FormCreateLayout>
  );
};

export default CreateForm;
