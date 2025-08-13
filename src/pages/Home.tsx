import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingButton, StatCard, FormCard } from "../components";
import PopupModal from "../components/PopupModal";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFloatingButtonClick = () => {
    console.log("Floating button clicked on Home page!");
    // Add your custom logic here - could be:
    // - Navigate to create form
    // - Open a modal
    // - Scroll to top
    // - Show help/support
  };

  const handleNewFormClick = () => {
    navigate("/create-form");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            <h3 className="text-xl font-semibold text-[var(--color-black-900)]">
              Recent
            </h3>
            <button 
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-green-600)] px-4 py-2 text-sm font-medium text-[var(--color-light-text-inverse)] hover:bg-[var(--color-green-700)]"
              onClick={handleNewFormClick}
            >
              <span className="text-lg">+</span>
              New Form
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormCard
              title="Conference Attendee Form"
              statusLabel="Draft"
              description="Lorem ipsum dolor sit amet consectetur. Ut id lacus lectus purus feugiat condimentum purus. Quisque integer id ultrices nibh sagittis in."
              category="Marketing"
              editedText="Edited 4 min ago"
            />
            <FormCard
              title="Workshop Participation Form"
              statusLabel="Status"
              description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              category="Sales"
              editedText="Edited 10 min ago"
            />
            <FormCard
              title="Webinar Registration"
              statusLabel="Status"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
              category="Development"
              editedText="Edited 15 min ago"
            />
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingButton
          onClick={handleFloatingButtonClick}
          variant="primary"
          size="md"
          aria-label="Create new form"
        />

        {/* Popup Modal */}
        <PopupModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="space-y-6">
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
                  placeholder="Describe your form (eg. Make a Doctor appointment form)"
                  className="w-full h-32 p-4 rounded-lg resize-none focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] placeholder-[var(--color-black-400)] text-[var(--color-black-900)]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-light-border)] bg-white text-[var(--color-black-700)] rounded-lg hover:bg-[var(--color-light-surface)] transition-colors">
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

                <button className="flex items-center gap-2 px-6 py-2 bg-[var(--color-green-600)] text-white rounded-lg hover:bg-[var(--color-green-700)] transition-colors font-medium">
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
                </button>
              </div>
            </div>
          </div>
        </PopupModal>
      </div>
    </div>
  );
};

export default Home;
