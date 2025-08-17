import React from "react";

const Submission: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-light-bg p-6">
        {/* Heading */}
        <div className="flex flex-col gap-6 rounded-lg bg-light-bg p-6">
          <h2 className="text-2xl font-semibold text-[var(--color-black-900)] mb-6">
            Submission
          </h2>

          {/* Content area - empty for now */}
          <div className="bg-[var(--color-light-card)] rounded-2xl p-6 border border-[var(--color-light-border)]">
            {/* Content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
