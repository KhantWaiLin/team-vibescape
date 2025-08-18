import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchBar,
  CategoryDropdown,
  FilterTabs,
  FormCard,
} from "../components";
import { filterTabs } from "../const/const";

const MyForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  const sampleForms = [
    {
      id: 1,
      title: "Networking Event Sign-Up",
      statusLabel: "published" as const,
      statusColor: "bg-[var(--color-green-100)] text-[var(--color-green-600)]",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.",
      category: "Human Resources",
      editedText: "Edited 1 hr ago",
      participantsCount: 15,
      viewsCount: 40,
    },
    {
      id: 2,
      title: "Panel Discussion RSVP",
      statusLabel: "published" as const,
      statusColor: "bg-[var(--color-green-100)] text-[var(--color-green-600)]",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.",
      category: "Finance",
      editedText: "Edited 20 min ago",
      participantsCount: 25,
      viewsCount: 45,
    },
    {
      id: 3,
      title: "Simple Contact Form",
      description:
        "Basic contact form for general inquiries and feedback collection.",
      category: "General",
      editedText: "Edited 3 days ago",
      // No statusLabel, participantsCount, or viewsCount - shows as basic form card
    },
    {
      id: 4,
      title: "Event Registration",
      statusLabel: "draft" as const,
      statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]",
      description:
        "Event registration form with multiple ticket types and payment options.",
      category: "Events",
      editedText: "Edited 2 days ago",
      // Only participants count, no views
      participantsCount: 8,
    },
  ];

  const handleNewForm = () => {
    navigate("/create-form");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log("Active tab changed to:", tabId);
    // Add your logic here to filter forms based on status
  };

  return (
    <div className="min-h-screen">
      <div className="bg-light-bg p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-[var(--color-black-900)]">
            My Form
          </h1>

          {/* New Form Button */}
          <button
            onClick={handleNewForm}
            className="inline-flex items-center gap-3 bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-[var(--color-light-text-inverse)] px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-[var(--color-green-600)] text-lg font-bold">
                +
              </span>
            </div>
            New Form
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          {/* Status Filter Tabs */}
          <div className="mb-6 flex justify-between">
            <FilterTabs
              tabs={filterTabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <CategoryDropdown
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full sm:w-48"
              />
              <SearchBar
                placeholder="Search Forms"
                className="w-full sm:w-64"
              />
            </div>
          </div>

          {/* Search and Category Filter */}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sampleForms.map((form) => (
            <FormCard
              key={form.id}
              title={form.title}
              statusLabel={form.statusLabel}
              statusColor={form.statusColor}
              description={form.description}
              category={form.category}
              editedText={form.editedText}
              participantsCount={form.participantsCount}
              viewsCount={form.viewsCount}
              maxWords={25}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyForm;
