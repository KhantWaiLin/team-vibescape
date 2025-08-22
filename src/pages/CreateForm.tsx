import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import type { Question } from "../types";
import { FormCreateLayout } from "../components/layout";
import FormPreview from "../components/FormPreview";
import { API_ENDPOINTS, apiService } from "../services/api";
import toast from "react-hot-toast";
import { parseFormOptions } from "../utils";

const CreateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formCategory, setFormCategory] = useState<string>("General");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [formId, setFormId] = useState<number | null>(null);

  // Check for template data from navigation state
  useEffect(() => {
    const data = location.state?.data;

    if (data) {
      // Convert template questions to the format expected by FormBuilder
      const questions: Question[] = data?.questions?.map(
        (q: any, index: number) => ({
          // Create temp id if missing for stable selection/editing before save
          id: q.id ?? Date.now() + index,
          question_text: q.question_text,
          question_type: q.question_type,
          is_required: q.is_required,
          options: q.options,
        })
      );

      // Set form data from template
      setQuestions(questions);
      setFormTitle(data.title);
      setFormDescription(data.description);
      setFormCategory(data.category || "General");
      // Extract form id if provided
      const createdId = data?.response?.id ?? data?.id;
      if (createdId) {
        setFormId(createdId);
      }

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

  const handleCategoryChange = (category: string) => {
    setFormCategory(category);
  };

  const handlePreviewClick = () => {
    setIsPreviewMode(true);
  };

  const handleBackToEdit = () => {
    setIsPreviewMode(false);
  };

  const handleSaveDraft = async () => {
    console.log(questions);
    try {
      if (!formId) {
        toast.error("No form ID available to save questions");
        return;
      }
      // Prepare payload: remove id, ensure 1-based order
      const payload = questions.map((q, index) => ({
        question_text: q.question_text,
        question_type: q.question_type,
        is_required: q.is_required,
        options: parseFormOptions(q.options),
        placeholder: q.placeholder,
        order: index + 1,
      }));
      await apiService.post(
        API_ENDPOINTS.QUESTIONS.BULK_CREATE(formId),
        { questions: payload },
        apiService.getAuthHeaders()
      );
      toast.success(
        `Draft saved successfully! ${questions.length} questions saved.`
      );
      navigate("/");
    } catch (e) {
      console.error("Failed to save draft", e);
      toast.error("Failed to save draft. Please try again.");
    }
  };

  const handleSubmitToAdmin = async () => {
    try {
      if (!formId) {
        toast.error("No form ID available to submit");
        return;
      }

      if (questions.length === 0) {
        toast.error("Please add at least one question before submitting");
        return;
      }

      // First save the current draft to ensure all questions are saved
      await handleSaveDraft();

      // Submit form to admin for approval
      const response = await apiService.postWithoutData<any>(
        API_ENDPOINTS.FORMS.SUBMIT_TO_ADMIN(formId),
        apiService.getAuthHeaders()
      );

      if (response.code === 200) {
        toast.success("Form submitted to admin successfully!");

        // Navigate to home page after successful submission
        navigate("/");
      } else {
        toast.error("Failed to submit form to admin");
      }
    } catch (error) {
      console.error("Error submitting form to admin:", error);
      toast.error("Failed to submit form to admin. Please try again.");
    }
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
      formCategory={formCategory}
      onFormCategoryChange={handleCategoryChange}
      onPreviewClick={handlePreviewClick}
      onSaveDraftClick={handleSaveDraft}
      onSubmitClick={handleSubmitToAdmin}
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
