import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormViewer, LoadingSpinner, PopupModal } from "../components";
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
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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
      toast.success("Form approved successfully!");
      console.log("Form approved successfully!");

      // Navigate to submission page
      navigate("/submission");
    } catch (error) {
      console.error("Error approving form:", error);
      // Show error toast
      toast.error("Failed to approve form. Please try again.");
      console.error("Failed to approve form");
    } finally {
      setIsProcessing(false);
    }
  };

  const openRejectModal = () => {
    setRejectReason("");
    setIsRejectOpen(true);
  };

  const submitReject = async () => {
    if (!formData) return;
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    setIsProcessing(true);
    try {
      await apiService.post(
        API_ENDPOINTS.ADMIN.REJECT(formData.id),
        { comment: rejectReason },
        apiService.getAuthHeaders()
      );
      toast.success("Form rejected successfully!");
      setIsRejectOpen(false);
      navigate("/submission");
    } catch (error) {
      console.error("Error rejecting form:", error);
      toast.error("Failed to reject form. Please try again.");
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
    <>
      <FormReviewLayout
        formData={formData}
        onFormUpdate={(updates) => {
          if (formData) {
            setFormData({ ...formData, ...updates });
          }
        }}
        onBack={handleBack}
        onApprove={handleApprove}
        onReject={openRejectModal}
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

      {/* Reject Reason Modal */}
      <PopupModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        size="md"
        showHeader
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-[var(--color-black-900)] mb-2">
            Reject Submission
          </h3>
          <p className="text-sm text-[var(--color-black-600)] mb-4">
            Please provide a reason for rejecting this submission. This will be
            visible to the submitter.
          </p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full border border-[var(--color-light-border)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={5}
            placeholder="Enter your reason here..."
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setIsRejectOpen(false)}
              className="px-4 py-2 rounded-lg border border-[var(--color-light-border)] text-[var(--color-black-700)] hover:bg-[var(--color-light-bg)]"
            >
              Cancel
            </button>
            <button
              onClick={submitReject}
              disabled={isProcessing}
              className="px-4 py-2 rounded-lg bg-[var(--color-red-600)] hover:bg-[var(--color-red-700)] text-white disabled:opacity-60"
            >
              {isProcessing ? "Submitting..." : "Submit Reason"}
            </button>
          </div>
        </div>
      </PopupModal>
    </>
  );
};

export default FormReview;
