import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar, TemplateCard, LoadingSpinner } from "../components";
import CategoryDropdown from "../components/CategoryDropdown";
import { templateForms } from "../const/templateData";
import { API_ENDPOINTS, apiService } from "../services/api";

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [templates, setTemplates] = useState(templateForms);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        setError(null);
        const res: any = await apiService.get(API_ENDPOINTS.TEMPLATES.LIST);
        const data = (res?.data ?? res) as typeof templateForms;
        if (Array.isArray(data)) {
          setTemplates(data);
        }
      } catch (e) {
        setError("Failed to load templates");
        // keep fallback templates from const
        console.error("Templates fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleUseTemplate = (template: any) => {
    // Navigate to CreateForm page with template data
    navigate("/create-form", {
      state: {
        data: template,
      },
    });
    navigate("/create-form", {
      state: {
        data: {
          id: template?.id,
          title: template?.name,
          description: template?.description,
          questions: template?.template_structure?.fields.map(
            (field: any, index: number) => ({
              id: Date.now() + index, // Temporary ID for client-side
              question_text: field.label,
              question_type: field.type,
              is_required: field.required ? 1 : 0,
              options: null,
              placeholder: `Enter ${field.label.toLowerCase()}`,
              order: index + 1,
            })
          ),
        },
      },
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
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-[var(--color-black-600)] py-8">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUseTemplate={handleUseTemplate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
