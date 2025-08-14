import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingButton, StatCard, FormCard, AIFormBuilderModal } from "../components";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFloatingButtonClick = () => {
    console.log("Floating button clicked on Home page!");
    handleOpenModal(); // Open the popup modal
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

        {/* AI Form Builder Modal */}
        <AIFormBuilderModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Home;
