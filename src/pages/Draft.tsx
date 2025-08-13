import React, { useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { FormCard, SearchBar } from "../components";

const Draft: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const sampleForms = [
    {
      id: 1,
      title: "Networking Event Sign-Up",
      statusLabel: "Draft",
      statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]",
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
      statusLabel: "Draft",
      statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]",

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
      statusLabel: "Draft",
      statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]",

      description:
        "Basic contact form for general inquiries and feedback collection.",
      category: "General",
      editedText: "Edited 3 days ago",
      // No statusLabel, participantsCount, or viewsCount - shows as basic form card
    },
    {
      id: 4,
      title: "Event Registration",
      statusLabel: "Draft",
      statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]",
      description:
        "Event registration form with multiple ticket types and payment options.",
      category: "Events",
      editedText: "Edited 2 days ago",
      // Only participants count, no views
      participantsCount: 8,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main container with blue top border */}
      <div className="rounded-2xl bg-[var(--color-light-card)] border-t-4 border-[var(--color-green-600)] shadow-sm">
        {/* Header section */}
        <div className="p-6 border-b border-[var(--color-light-border)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Template heading */}
            <h1 className="text-2xl font-bold text-[var(--color-black-900)]">
              Draft
            </h1>

            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
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
        </div>

        {/* Template cards grid */}
        <div className="p-6">
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
    </div>
  );
};

export default Draft;
