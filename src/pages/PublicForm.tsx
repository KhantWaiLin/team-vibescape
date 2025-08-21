import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormViewer, LoadingSpinner } from "../components";
import { API_ENDPOINTS, apiService } from "../services/api";
import type { Question, FormSubmissionPayload } from "../types";
import toast from "react-hot-toast";

interface PublicFormData {
  id: string | number;
  title: string;
  description?: string;
  questions?: Question[];
}

const PublicForm: React.FC = () => {
  const { formUrl } = useParams<{ formUrl: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<PublicFormData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!formUrl) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch the form detail by URL identifier (slug/token)
        const detail: any = await apiService.get(
          API_ENDPOINTS.FORMS.PBULIC(formUrl),
          apiService.getAuthHeaders()
        );
        setForm(detail?.data ?? detail);

        // If questions are embedded in detail, use them; otherwise fetch questions
        if (detail?.data?.questions && Array.isArray(detail.data.questions)) {
          setQuestions(detail.data.questions as Question[]);
        } else {
          try {
            const qs: any = await apiService.get(
              API_ENDPOINTS.QUESTIONS.LIST(formUrl)
            );
            const extracted = (qs?.data ?? qs) as Question[];
            setQuestions(Array.isArray(extracted) ? extracted : []);
          } catch (err) {
            // If questions endpoint fails, fall back to empty list
            setQuestions([]);
          }
        }
      } catch (e) {
        setError("Failed to load form");
        console.error("Public form fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [formUrl]);

  const handleBack = () => navigate(-1);

  const handleSubmit = async (formData: FormSubmissionPayload) => {
    if (!formUrl) return;
    setSubmitting(true);
    try {
      // Use the new submission format directly
      await apiService.post(API_ENDPOINTS.RESPONSES.CREATE, formData);
      toast.success("Response submitted successfully!");
      navigate("/submission");
    } catch (e) {
      console.error("Submit response error", e);
      toast.error("Failed to submit response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-black-900)] mb-4">
            {error || "Form not found"}
          </h2>
          <button
            onClick={handleBack}
            className="bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormViewer
      formTitle={form.title}
      formDescription={form.description}
      questions={questions}
      onSubmit={handleSubmit}
      isPreview={false}
      submitButtonText={submitting ? "Submitting..." : "Submit Response"}
      urlToken={formUrl}
    />
  );
};

export default PublicForm;
