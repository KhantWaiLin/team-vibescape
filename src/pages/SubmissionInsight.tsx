import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import { apiService } from "../services/api";
import toast from "react-hot-toast";
import SubmissionInsightLayout from "../components/layout/SubmissionInsightLayout";

const SubmissionInsight = () => {
  const { formId } = useParams<{ formId: string }>();
  
  // State for form data and submissions
  const [formData, setFormData] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats calculated from form data
  const [stats, setStats] = useState({
    totalResponses: 0,
    totalViews: 0,
    conversionRate: 0
  });

  // Fetch form submissions data
  useEffect(() => {
    const fetchFormSubmissions = async () => {
      if (!formId) {
        setError("No form ID provided");
        setLoading(false);
        return;
      }

      console.log("Fetching submissions for form ID:", formId);
      console.log("API endpoint:", `/api/form-submissions/detail/${formId}`);

      try {
        setLoading(true);
        setError(null);

        // Call the API endpoint you specified
        const response: any = await apiService.get(
          `/api/form-submissions/detail/${formId}`,
          apiService.getAuthHeaders()
        );

        console.log("API Response:", response);
        
        if (response.code === 200 && response.data) {
          setFormData(response.data);
          
          // Extract and format submissions from response
          if (response.data.submissions) {
            const formattedSubmissions = response.data.submissions.flatMap((userSubmission: any) => {
              return userSubmission.submissions.map((submission: any, index: number) => {
                // Format submission date and time
                const submittedAt = new Date(submission.submitted_at);
                const date = submittedAt.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                });
                const time = submittedAt.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                });
                
                return {
                  id: submission.id,
                  submitter: userSubmission.user_identifier,
                  date: date,
                  time: time,
                  totalQuestions: submission.total_questions_answered,
                  submittedAt: submission.submitted_at
                };
              });
            });
            
            setSubmissions(formattedSubmissions);
            console.log("Formatted submissions:", formattedSubmissions);
          }
          
          // Calculate stats from summary data
          const totalResponses = response.data.summary?.total_submissions || 0;
          const uniqueUsers = response.data.summary?.unique_users || 0;
          const questionsCount = response.data.summary?.questions_count || 0;
          
          console.log("Calculated stats:", { totalResponses, uniqueUsers, questionsCount });
          
          setStats({
            totalResponses,
            totalViews: uniqueUsers, // Using unique users as views for now
            conversionRate: uniqueUsers > 0 ? Math.round((totalResponses / uniqueUsers) * 100) : 0
          });
        } else {
          setError("Failed to fetch form submissions data");
        }
      } catch (error: any) {
        console.error("Error fetching form submissions:", error);
        setError(error.response?.data?.message || "Failed to fetch form submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchFormSubmissions();
  }, [formId]);

  // Handle export responses
  const handleExportResponses = async () => {
    if (!formId) {
      toast.error("No form ID available for export");
      return;
    }

    try {
      const response = await apiService.get(
        `/api/form-submissions/export/${formId}`,
        {
          ...apiService.getAuthHeaders(),
          responseType: 'blob' // Important for file downloads
        }
      ) as Blob;

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `form-submissions-${formId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export completed successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export responses");
    }
  };

  // Table columns configuration
  const columns: Column<typeof submissions[0]>[] = [
    {
      key: "id",
      header: "No.",
      width: "80px",
      render: (value) => (
        <div className="font-medium text-[var(--color-black-700)]">{value}</div>
      ),
    },
    {
      key: "submitter",
      header: "Submitter",
      render: (value) => (
        <div className="text-[var(--color-black-600)]">{value}</div>
      ),
    },
    {
      key: "totalQuestions",
      header: "Questions Answered",
      width: "140px",
      render: (value) => (
        <div className="text-[var(--color-black-600)] text-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-[var(--color-primary)] text-white text-xs font-medium rounded-full">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Submission Date",
      render: (value) => (
        <div className="text-[var(--color-black-600)]">{value}</div>
      ),
    },
    {
      key: "time",
      header: "Submission Time",
      render: (value) => (
        <div className="text-[var(--color-black-600)]">{value}</div>
      ),
    },
    {
      key: "actions",
      header: "Action",
      width: "100px",
      render: () => (
        <button className="p-2 text-[var(--color-black-500)] hover:text-[var(--color-black-700)] hover:bg-[var(--color-light-bg)] rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </button>
      ),
    },
  ];

  

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-green-600)] mx-auto mb-4"></div>
            <p className="text-[var(--color-black-600)]">Loading submission insights...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-black-900)] mb-2">Error Loading Data</h2>
            <p className="text-[var(--color-black-600)] mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SubmissionInsightLayout 
      title={formData?.form?.title || "Form Submissions"}
      status={formData?.form?.status || "Unknown"}
      formData={formData}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-black-900)] mb-2">
          Submission Insights
          {formData?.title && (
            <span className="text-lg font-normal text-[var(--color-black-600)] ml-2">
              - {formData.title}
            </span>
          )}
        </h1>
        <p className="text-[var(--color-black-600)]">
          Track your form performance and submission analytics
        </p>
        {formId && (
          <div className="mt-2 p-3 bg-[var(--color-light-bg)] rounded-lg border border-[var(--color-light-border)]">
            <p className="text-sm text-[var(--color-black-600)]">
              <strong>Form ID:</strong> {formId}
            </p>
            <p className="text-sm text-[var(--color-black-600)]">
              <strong>API Endpoint:</strong> /api/form-submissions/detail/{formId}
            </p>
            {formData && (
              <div className="mt-2 pt-2 border-t border-[var(--color-light-border)]">
                <p className="text-sm text-[var(--color-black-600)]">
                  <strong>Form Title:</strong> {formData.form?.title || 'N/A'}
                </p>
                <p className="text-sm text-[var(--color-black-600)]">
                  <strong>Total Submissions:</strong> {formData.summary?.total_submissions || 0}
                </p>
                <p className="text-sm text-[var(--color-black-600)]">
                  <strong>Unique Users:</strong> {formData.summary?.unique_users || 0}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Responses"
          value={stats.totalResponses}
          className="bg-white"
        />
        
        <StatCard
          title="Unique Users"
          value={stats.totalViews}
          subtitle="Different submitters"
          className="bg-white"
        />
        
        <StatCard
          title="Questions Count"
          value={formData?.summary?.questions_count || 0}
          subtitle="Total questions"
          className="bg-white"
        />
        
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle="Responses per user"
          className="bg-white"
        />
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-[var(--color-light-border)] shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-black-900)]">
            Responses
          </h2>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleExportResponses()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-black-600)] border border-[var(--color-light-border)] rounded-lg hover:bg-[var(--color-light-bg)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Response
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-black-600)] border border-[var(--color-light-border)] rounded-lg hover:bg-[var(--color-light-bg)] transition-colors">
              Search Forms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <DataTable
          data={submissions}
          columns={columns}
          pageSize={5}
          className=""
          emptyMessage="No submissions found"
        />
      </div>
    </SubmissionInsightLayout>
  );
};

export default SubmissionInsight;
