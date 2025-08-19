import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FloatingButton,
  StatCard,
  FormCard,
  AIFormBuilderModal,
  NewFormModal,
  LoadingSpinner,
} from "../components";
import { API_ENDPOINTS, apiService } from "../services/api";
import type { Form } from "../types";
import { getStatusColor } from "../utils";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewFormModalOpen, setIsNewFormModalOpen] = useState(false);
  const [recentForms, setRecentForms] = useState<Form[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const navigate = useNavigate();

  // Fetch recent forms on component mount
  useEffect(() => {
    fetchRecentForms();
  }, []);

  const fetchRecentForms = async () => {
    try {
      setIsLoadingRecent(true);
      const response = await apiService.get<any>(
        API_ENDPOINTS.FORMS.RECENT,
        apiService.getAuthHeaders()
      );

      if (response.code == 200 && response.data) {
        setRecentForms(response.data);
      } else {
        console.warn("No recent forms data received:", response);
        setRecentForms([]);
      }
    } catch (error) {
      console.error("Error fetching recent forms:", error);
      setRecentForms([]);
      // You could show a toast notification here for better UX
    } finally {
      setIsLoadingRecent(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `Edited ${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `Edited ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Edited ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const handleFloatingButtonClick = () => {
    console.log("Floating button clicked on Home page!");
    handleOpenModal(); // Open the popup modal
  };

  const handleNewFormClick = () => {
    setIsNewFormModalOpen(true);
  };

  const handleCreateForm = async (title: string, description: string) => {
    setIsLoading(true);
    try {
      // Here you can add logic to save the form data or navigate with the form details
      const response = await apiService.post<any>(
        API_ENDPOINTS.FORMS.CREATE,
        {
          title,
          description,
        },
        apiService.getAuthHeaders()
      );
      console.log("Form created successfully", response);

      // Navigate to create form page with the form details
      navigate("/create-form", {
        state: {
          data: {
            title,
            description,
            response: response.data,
            questions: [],
          },
        },
      });

      // Refresh the recent forms list to show the newly created form
      fetchRecentForms();
    } catch (error) {
      console.error("Error creating form:", error);
      // You might want to show an error message to the user here
      // For now, we'll just log it and not navigate
      return; // Don't navigate on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNewFormModal = () => {
    setIsNewFormModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <div className="bg-light-bg p-6">
        {/* Heading */}
        <div className="flex flex-col gap-6 rounded-lg bg-light-bg p-6">
          <h2 className="text-2xl font-semibold text-[var(--color-black-900)] mb-6">
            Form Management
          </h2>

          {/* Stat cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Form"
              value={10}
              subtitle="3 published"
              className="bg-[#E7F0FF]"
            />
            <StatCard
              title="Total Response"
              value={348}
              subtitle="Across all forms"
              className="bg-[#E8FFE7]"
            />
            <StatCard
              title="Total Views"
              value={816}
              subtitle="Form page visits"
              className="bg-[#F5E8FF]"
            />
            <StatCard
              title="Average Response Rate"
              value={"10%"}
              subtitle="Responses per view"
              className="bg-[#FFF1DE]"
            />
          </div>
        </div>

        {/* Recent section */}
        <div className="mt-8 rounded-2xl bg-[var(--color-light-card)] p-6 border border-[var(--color-light-border)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-[var(--color-black-900)]">
                Recent
              </h3>
              <button
                onClick={fetchRecentForms}
                disabled={isLoadingRecent}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-[var(--color-light-text-inverse)] hover:bg-[var(--color-blue-700)] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh recent forms"
              >
                <svg
                  className={`w-4 h-4 ${isLoadingRecent ? "animate-spin" : ""}`}
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
                {isLoadingRecent ? "Refreshing..." : "Refresh"}
              </button>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-green-600)] px-4 py-2 text-sm font-medium text-[var(--color-light-text-inverse)] hover:bg-[var(--color-green-700)]"
              onClick={handleNewFormClick}
            >
              <span className="text-lg">+</span>
              New Form
            </button>
          </div>

          {isLoadingRecent ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : recentForms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No recent forms found.</p>
              <p className="text-sm text-gray-400">
                Create your first form to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recentForms.map((form) => (
                <FormCard
                  key={form.id}
                  title={form.title}
                  statusLabel={form.status}
                  description={form.description}
                  category={form.category || "General"}
                  onEdit={() => {}}
                  editedText={formatTimeAgo(form.updated_at)}
                  statusColor={getStatusColor(form.status)}
                  participantsCount={form.participants_count}
                  viewsCount={form.views_count}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <FloatingButton
          onClick={handleFloatingButtonClick}
          variant="primary"
          size="md"
          aria-label="Create new form"
        />

        {/* AI Form Builder Modal */}
        <AIFormBuilderModal isOpen={isModalOpen} onClose={handleCloseModal} />

        {/* New Form Modal */}
        <NewFormModal
          isOpen={isNewFormModalOpen}
          onClose={handleCloseNewFormModal}
          onSubmit={handleCreateForm}
        />
      </div>
    </div>
  );
};

export default Home;
