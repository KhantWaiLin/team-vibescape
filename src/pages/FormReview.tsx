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
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [publishType, setPublishType] = useState<"public" | "internal">(
    "public"
  );
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);

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

  const handleApprove = () => {
    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!formData) return;
    setIsProcessing(true);
    try {
      // First, approve the form
      await apiService.postWithoutData(
        API_ENDPOINTS.ADMIN.APPROVED(formData.id),
        apiService.getAuthHeaders()
      );

      // Then, publish the form with the selected settings
      await apiService.postWithoutData(
        API_ENDPOINTS.ADMIN.PUBLISH(formData.id),
        apiService.getAuthHeaders()
      );

      // Show success toast
      toast.success("Form approved and published successfully!");
      console.log("Form approved and published successfully!");

      // Navigate to submission page
      navigate("/submission");
    } catch (error) {
      console.error("Error approving/publishing form:", error);
      // Show error toast
      toast.error("Failed to approve and publish form. Please try again.");
      console.error("Failed to approve and publish form");
    } finally {
      setIsProcessing(false);
      setIsApproveModalOpen(false);
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

      {/* Approve & Published Modal */}
      <PopupModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        size="lg"
        showHeader={false}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[var(--color-black-900)]">
              Approve & Published
            </h3>
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="text-[var(--color-black-400)] hover:text-[var(--color-black-600)] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Publishing Options */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-[var(--color-black-700)] mb-4">
              Publishing Options
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Public Option */}
              <button
                onClick={() => setPublishType("public")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  publishType === "public"
                    ? "border-[var(--color-green-600)] bg-[var(--color-green-50)]"
                    : "border-[var(--color-light-border)] bg-white hover:border-[var(--color-green-300)]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      publishType === "public"
                        ? "bg-[var(--color-green-600)] text-white"
                        : "bg-[var(--color-light-bg)] text-[var(--color-black-600)]"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className={`font-medium ${
                      publishType === "public"
                        ? "text-[var(--color-green-600)]"
                        : "text-[var(--color-black-700)]"
                    }`}
                  >
                    Public
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    publishType === "public"
                      ? "text-[var(--color-green-700)]"
                      : "text-[var(--color-black-500)]"
                  }`}
                >
                  Anyone with this link
                </p>
              </button>

              {/* Internal Option */}
              <button
                onClick={() => setPublishType("internal")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  publishType === "internal"
                    ? "border-[var(--color-green-600)] bg-[var(--color-green-50)]"
                    : "border-[var(--color-light-border)] bg-white hover:border-[var(--color-green-300)]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      publishType === "internal"
                        ? "bg-[var(--color-green-600)] text-white"
                        : "bg-[var(--color-light-bg)] text-[var(--color-black-600)]"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className={`font-medium ${
                      publishType === "internal"
                        ? "text-[var(--color-green-600)]"
                        : "text-[var(--color-black-700)]"
                    }`}
                  >
                    Internal
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    publishType === "internal"
                      ? "text-[var(--color-green-700)]"
                      : "text-[var(--color-black-500)]"
                  }`}
                >
                  Only people in this organization
                </p>
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-[var(--color-black-700)] mb-4">
              Account Setting
            </h4>

            {/* Allow Anonymous Submission */}
            <div className="flex items-center justify-between py-3 border-b border-[var(--color-light-border)]">
              <div>
                <p className="font-medium text-[var(--color-black-700)]">
                  Allow Anonymous submission
                </p>
                <p className="text-sm text-[var(--color-black-500)]">
                  Users don't need to provide their email or name
                </p>
              </div>
              <button
                onClick={() => setAllowAnonymous(!allowAnonymous)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  allowAnonymous
                    ? "bg-[var(--color-green-600)]"
                    : "bg-[var(--color-light-border)]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    allowAnonymous ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Require Login */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-[var(--color-black-700)]">
                  Require Login
                </p>
                <p className="text-sm text-[var(--color-black-500)]">
                  Users must be logged in to submit the form
                </p>
              </div>
              <button
                onClick={() => setRequireLogin(!requireLogin)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  requireLogin
                    ? "bg-[var(--color-green-600)]"
                    : "bg-[var(--color-light-border)]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    requireLogin ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="px-6 py-2 rounded-lg border border-[var(--color-light-border)] text-[var(--color-black-700)] hover:bg-[var(--color-light-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmApprove}
              disabled={isProcessing}
              className="px-6 py-2 rounded-lg bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-white disabled:opacity-60 transition-colors"
            >
              {isProcessing ? "Publishing..." : "Confirm"}
            </button>
          </div>
        </div>
      </PopupModal>
    </>
  );
};

export default FormReview;
