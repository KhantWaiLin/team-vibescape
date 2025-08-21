import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import { FormCard, SearchBar, Pagination } from "../components";
import { API_ENDPOINTS, apiService } from "../services/api";
import { LoadingSpinner } from "../components";

const Draft: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const navigate = useNavigate();

  // Fetch forms with draft status
  const fetchForms = async (
    page: number = 1,
    per_page: number = 10,
    search?: string,
    category?: string
  ) => {
    setLoading(true);
    try {
      const response: any = await apiService.get(
        API_ENDPOINTS.SEARCH.SEARCH({
          keyword: search,
          page,
          per_page,
          status: "draft", // Always filter for draft status
        })
      );
      setApiData(response);
    } catch (error) {
      console.error("Error fetching draft forms:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load forms on component mount and when filters change
  useEffect(() => {
    fetchForms(currentPage, perPage, searchKeyword, selectedCategory);
  }, [currentPage, searchKeyword, selectedCategory]);

  // Handle search
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditForm = (formId: number) => {
    navigate(`/create-form/${formId}`);
  };

  // Extract forms from API response and map them like MyForm
  const forms = apiData?.data?.map((form: any) => ({
    id: form.id,
    title: form.title || "Untitled Form",
    description: form.description || "No description available",
    category: form.category?.name || form.category || "General",
    statusLabel: (form.status as any) || undefined,
    statusColor: "bg-[var(--color-black-100)] text-[var(--color-black-600)]", // Draft status color
    editedText: `Updated ${new Date(
      form.updated_at || form.created_at
    ).toLocaleDateString()}`,
    participantsCount: form.participants_count || 0,
    viewsCount: form.views_count || 0,
    username: form.username || "User",
  })) || [];

  // Extract pagination info from meta
  const totalPages = apiData?.meta?.last_page || 1;
  const totalForms = apiData?.meta?.total || 0;

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
                onChange={handleCategoryChange}
                className="w-full sm:w-48"
              />
                          <SearchBar
              placeholder="Search Forms"
              className="w-full sm:w-64"
              onSearch={handleSearch}
            />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="p-6">
            <div className="flex items-center justify-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          </div>
        )}

        {/* Forms grid */}
        {!loading && (
          <div className="p-6">
            {forms.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-[var(--color-black-400)] mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[var(--color-black-600)] mb-2">No draft forms found</h3>
                <p className="text-[var(--color-black-400)]">Create your first form to get started.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-[var(--color-black-600)]">
                  Showing {forms.length} of {totalForms} draft forms
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {forms.map((form: any) => (
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
                      onEdit={() => handleEditForm(form.id)}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      lastPage={totalPages}
                      total={totalForms}
                      perPage={perPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Draft;
