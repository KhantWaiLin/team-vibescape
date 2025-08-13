import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar, TemplateCard } from "../components";
import CategoryDropdown from "../components/CategoryDropdown";
import { templateForms } from "../const/templateData";

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  const handleUseTemplate = (template: any) => {
    // Navigate to CreateForm page with template data
    navigate("/create-form", { 
      state: { 
        templateData: template,
        isFromTemplate: true 
      } 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Main container with blue top border */}
      <div className="rounded-2xl bg-[var(--color-light-card)] border-t-4 border-[var(--color-green-600)] shadow-sm">
        {/* Header section */}
        <div className="p-6 border-b border-[var(--color-light-border)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Template heading */}
            <h1 className="text-2xl font-bold text-[var(--color-black-900)]">
              Template
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {templateForms.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUseTemplate={handleUseTemplate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
