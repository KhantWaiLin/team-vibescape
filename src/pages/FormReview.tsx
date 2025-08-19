import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormViewer, LoadingSpinner } from "../components";
import FormReviewLayout from "../components/layout/FormReviewLayout";
import { API_ENDPOINTS, apiService } from "../services/api";
import toast from "react-hot-toast";

interface FormData {
  id: string;
  title: string;
  description?: string;
  questions: any[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const FormReview: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (formId) {
      fetchFormData(formId);
    }
  }, [formId]);

  const fetchFormData = async (id: string) => {
    try {
      const response: any = await apiService.get(
        API_ENDPOINTS.FORMS.DETAIL(id),
        apiService.getAuthHeaders()
      );

      setFormData(response.data);
    } catch (err) {
      setError("Failed to load form data");
      console.error("Error fetching form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleApprove = async () => {
    if (!formData) return;
    setIsProcessing(true);
    try {
      await apiService.postWithoutData(
        API_ENDPOINTS.ADMIN.APPROVED(formData.id),
        apiService.getAuthHeaders()
      );

      // Show success toast
      // TODO: Add your toast library here
      toast.success("Form approved successfully!");
      console.log("Form approved successfully!");

      // Navigate to submission page
      navigate("/submission");
    } catch (error) {
      console.error("Error approving form:", error);
      // Show error toast
      // TODO: Add your toast library here
      toast.error("Failed to approve form. Please try again.");
      console.error("Failed to approve form");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!formData) return;
    setIsProcessing(true);
    try {
      // TODO: Replace with actual API call
      // await api.rejectSubmission(formData.id);
      await apiService.postWithoutData(
        API_ENDPOINTS.ADMIN.REJECT(formData.id),
        apiService.getAuthHeaders()
      );
      console.log("Form rejected:", formData.id);

      // Show success toast
      // TODO: Add your toast library here
      toast.success("Form rejected successfully!");
      console.log("Form rejected successfully!");

      // Navigate to submission page
      navigate("/submission");
    } catch (error) {
      console.error("Error rejecting form:", error);
      // Show error toast
      // TODO: Add your toast library here
      toast.error("Failed to reject form. Please try again.");
      console.error("Failed to reject form");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-fit bg-[var(--color-light-bg)] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !formData) {
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
    <FormReviewLayout
      formData={formData}
      onFormUpdate={(updates) => {
        if (formData) {
          setFormData({ ...formData, ...updates });
        }
      }}
      onBack={handleBack}
      onApprove={handleApprove}
      onReject={handleReject}
      isProcessing={isProcessing}
      isEditing={false}
    >
      <FormViewer
        formTitle={formData.title}
        formDescription={formData.description}
        questions={formData.questions}
        isPreview={true}
      />
    </FormReviewLayout>
  );
};

export default FormReview;
