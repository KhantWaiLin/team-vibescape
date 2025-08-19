import React, { useState, useEffect, useRef } from "react";
import {
  CategoryDropdown,
  FilterTabs,
  InfoCard,
  SearchBar,
  SubmissionCard,
  Pagination,
} from "../components";
import { fileIcon, submissionIcon } from "../assets/icons/icons";
import { type FormStatus } from "../utils/statusUtils";
import { API_ENDPOINTS, apiService } from "../services/api";
import { filterTabs, getApiStatus } from "../const/const";

// API Response Types

const Submission: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const isInitialMount = useRef(true);

  // API call using the search endpoint
  const fetchForms = async (
    page: number = 1,
    per_page: number = 10,
    search?: string,
    status?: string
  ) => {
    setLoading(true);
    try {
      const response: any = await apiService.get(
        API_ENDPOINTS.SEARCH.SEARCH({
          keyword: search,
          page: page,
          per_page: per_page,
          status: status,
        })
      );

      setApiData(response);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (isInitialMount.current) {
      fetchForms(1, 10, "", getApiStatus(activeTab));
      isInitialMount.current = false;
    }
  }, []);

  // Handle tab changes
  useEffect(() => {
    if (!isInitialMount.current) {
      setCurrentPage(1);
      fetchForms(1, 10, searchKeyword, getApiStatus(activeTab));
    }
  }, [activeTab]);

  // Handle search changes
  useEffect(() => {
    if (!isInitialMount.current) {
      setCurrentPage(1);
      fetchForms(1, 10, searchKeyword, getApiStatus(activeTab));
    }
  }, [searchKeyword]);

  // Handle page changes
  useEffect(() => {
    if (!isInitialMount.current) {
      fetchForms(currentPage, 10, searchKeyword, getApiStatus(activeTab));
    }
  }, [currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
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

  // Transform API data to SubmissionCard format
  const submissions =
    apiData?.data.map((form: any) => ({
      id: form.id,
      formId: form.slug,
      title: form.title,
      status: form.status as FormStatus,
      description: form.description,
      fieldCount: Math.floor(Math.random() * 10) + 3, // Mock field count
      assignee: { name: form.username },
      category: "General", // Mock category
    })) || [];

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
              value={apiData?.meta.total || 0}
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
                onSearch={handleSearch}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-green-600)]"></div>
            </div>
          )}

          {/* Submissions Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {submissions.map((submission: any) => (
                  <SubmissionCard
                    key={submission.id}
                    formId={submission.id}
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

              {/* Pagination */}
              {apiData && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    lastPage={apiData.meta.last_page}
                    total={apiData.meta.total}
                    perPage={apiData.meta.per_page}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submission;
