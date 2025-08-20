import React, { useState } from "react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";

const SubmissionInsight = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalResponses: 2,
    totalViews: 10,
    conversionRate: 10
  };

  // Mock submissions data
  const submissions = [
    { id: 1, submitter: "tim.jennings@example.com", date: "Jul 15 2025", time: "03:45 PM" },
    { id: 2, submitter: "curtis.weaver@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 3, submitter: "willie.jennings@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 4, submitter: "bill.sanders@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 5, submitter: "georgia.young@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 6, submitter: "tanya.hill@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 7, submitter: "deanna.curtis@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 8, submitter: "felicia.reid@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 9, submitter: "debbie.baker@example.com", date: "Jul 15 2025", time: "04:30 PM" },
    { id: 10, submitter: "sara.cruz@example.com", date: "Jul 15 2025", time: "04:30 PM" },
  ];

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

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-black-900)] mb-2">
          Submission Insights
        </h1>
        <p className="text-[var(--color-black-600)]">
          Track your form performance and submission analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Responses"
          value={stats.totalResponses}
          className="bg-white"
        />
        
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          subtitle="Form page visits"
          className="bg-white"
        />
        
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle="Responses per view"
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
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-black-600)] border border-[var(--color-light-border)] rounded-lg hover:bg-[var(--color-light-bg)] transition-colors">
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
    </div>
  );
};

export default SubmissionInsight;
