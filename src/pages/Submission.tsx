import React, { useState } from "react";
import {
  CategoryDropdown,
  FilterTabs,
  InfoCard,
  SearchBar,
  SubmissionCard,
} from "../components";
import { fileIcon, submissionIcon } from "../assets/icons/icons";
import { type FormStatus } from "../utils/statusUtils";
import { filterTabs } from "../const/const";

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

// Sample submission data for SubmissionCard
const submissions = [
  {
    id: 1,
    title: "Webinar Sign-Up Form",
    status: "pending" as FormStatus,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.",
    fieldCount: 4,
    assignee: { name: "Sofia" },
    category: "Sales",
  },
  {
    id: 2,
    title: "Customer Feedback Survey",
    status: "approved" as FormStatus,
    description:
      "Customer satisfaction survey with rating questions and open-ended feedback collection.",
    fieldCount: 8,
    assignee: { name: "Alex" },
    category: "Marketing",
  },
  {
    id: 3,
    title: "Employee Onboarding Form",
    status: "pending" as FormStatus,
    description:
      "Comprehensive onboarding form for new employees including personal information and preferences.",
    fieldCount: 12,
    assignee: { name: "Maria" },
    category: "Human Resources",
  },
];

const Submission: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleReview = (submissionId: number) => {
    console.log("Review submission:", submissionId);
  };

  const handleApprove = (submissionId: number) => {
    console.log("Approve submission:", submissionId);
  };

  const handleReject = (submissionId: number) => {
    console.log("Reject submission:", submissionId);
  };

  return (
    <div className="min-h-screen">
      <div className="rounded-2xl bg-[var(--color-light-card)] border-t-4 border-[var(--color-green-600)] shadow-sm">
        {/* Heading */}
        <div className="flex flex-col gap-6 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[var(--color-black-900)] mb-6">
            Submission on View
          </h2>

          {/* Example InfoCard usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <InfoCard
              label="Total Submission"
              value={10}
              icon={submissionIcon({})}
              onClick={() => console.log("Total Submission clicked")}
            />

            <InfoCard label="Active Forms" value={5} icon={fileIcon({})} />

            <InfoCard
              label="Completed Forms"
              value={25}
              icon={submissionIcon({})}
            />
          </div>

          {/* Filter Section */}
          <div className="mb-6 flex justify-between">
            <FilterTabs
              tabs={filterTabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
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

          {/* Submissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                title={submission.title}
                status={submission.status}
                description={submission.description}
                fieldCount={submission.fieldCount}
                assignee={submission.assignee}
                category={submission.category}
                onReview={() => handleReview(submission.id)}
                onApprove={() => handleApprove(submission.id)}
                onReject={() => handleReject(submission.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
