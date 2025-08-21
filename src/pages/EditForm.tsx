import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import type { Question } from "../types";
import { FormCreateLayout } from "../components/layout";
import FormPreview from "../components/FormPreview";
import { API_ENDPOINTS, apiService } from "../services/api";
import toast from "react-hot-toast";
import { parseFormOptions, separateQuestionsByStatus, prepareQuestionsForSubmission } from "../utils";

const EditForm = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formCategory, setFormCategory] = useState<string>("General");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Load existing form data
  useEffect(() => {
    const loadFormData = async () => {
      if (!formId) {
        toast.error("No form ID provided");
        navigate("/");
        return;
      }

      try {
        setLoading(true);

        // Fetch form details
        const formResponse: any = await apiService.get(
          API_ENDPOINTS.FORMS.DETAIL(formId),
          apiService.getAuthHeaders()
        );

        if (formResponse.code === 200 && formResponse.data) {
          const form = formResponse.data;
          setFormTitle(form.title || "Untitled Form");
          setFormDescription(form.description || "");
          setFormCategory(form.category || "General");
        } else {
          toast.error("Failed to load form details");
          navigate("/");
          return;
        }

        // Fetch form questions
        const questionsResponse: any = await apiService.get(
          API_ENDPOINTS.QUESTIONS.LIST(formId),
          apiService.getAuthHeaders()
        );

        if (questionsResponse.code === 200 && questionsResponse.data) {
          const loadedQuestions: Question[] = questionsResponse.data.map(
            (q: any) => ({
              id: q.id,
              question_text: q.question_text,
              question_type: q.question_type,
              is_required: q.is_required,
              options: q.options,
              placeholder: q.placeholder,
              order: q.order,
            })
          );
          setQuestions(loadedQuestions);
        } else {
          toast.error("Failed to load form questions");
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error loading form data:", error);
        toast.error("Failed to load form data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [formId, navigate]);

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

  const handleSaveDraft = async () => {
    if (!formId) {
      toast.error("No form ID available to save questions");
      return;
    }

    try {
      setSaving(true);

      // Analyze questions to identify new vs existing
      const { newQuestions, existingQuestions } = separateQuestionsByStatus(questions);
      
      console.log('=== QUESTION ANALYSIS ===');
      console.log(`Total questions: ${questions.length}`);
      console.log(`New questions: ${newQuestions.length}`);
      console.log(`Existing questions: ${existingQuestions.length}`);
      
      if (newQuestions.length > 0) {
        console.log('New questions:', newQuestions.map(q => ({ text: q.question_text, type: q.question_type })));
      }
      
      if (existingQuestions.length > 0) {
        console.log('Existing questions:', existingQuestions.map(q => ({ id: q.id, text: q.question_text, type: q.question_type })));
      }
      console.log('========================');

      // Prepare the complete request body in the required format
      const requestBody = {
        override: true,
        title: formTitle,
        description: formDescription,
        category: formCategory,
        is_published: false,
        published_at: null,
        questions: prepareQuestionsForSubmission(questions),
      };

      // Send single PUT request to update form with all data
      await apiService.put(
        API_ENDPOINTS.FORMS.UPDATE(formId),
        requestBody,
        apiService.getAuthHeaders()
      );

      toast.success(
        `Form updated successfully! ${questions.length} questions saved.`
      );
      
      // Navigate to draft page after successful save
      navigate("/");
    } catch (e) {
      console.error("Failed to update form", e);
      toast.error("Failed to update form. Please try again.");
    } finally {
      setSaving(false);
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

      // First save the current draft to ensure all changes are saved
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

  const handleCategoryChange = (category: string) => {
    setFormCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-green-600)] mx-auto mb-4"></div>
          <p className="text-[var(--color-black-600)]">Loading form...</p>
        </div>
      </div>
    );
  }

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
      formCategory={formCategory}
      onFormTitleChange={setFormTitle}
      onFormDescriptionChange={setFormDescription}
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

export default EditForm;
