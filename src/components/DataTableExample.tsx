import React, { useState } from "react";
import DataTable, { Column } from "./DataTable";

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

// Example data
const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "inactive",
    createdAt: "2024-01-17",
  },
  // Add more sample data as needed
];

const DataTableExample: React.FC = () => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Define columns - you can easily add, remove, or modify these
  const columns: Column<User>[] = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      sortable: true,
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="font-medium text-[var(--color-black-700)]">
          {value}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (value) => (
        <div className="text-[var(--color-green-600)] hover:underline cursor-pointer">
          {value}
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium bg-[var(--color-light-bg)] text-[var(--color-black-600)] rounded-full">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
      render: (value) => (
        <div className="text-sm text-[var(--color-black-500)]">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1 text-[var(--color-green-600)] hover:bg-[var(--color-light-bg)] rounded">
            Edit
          </button>
          <button className="p-1 text-[var(--color-red-600)] hover:bg-[var(--color-light-bg)] rounded">
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Handle sorting
  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
    // Here you would typically sort your data or make an API call
    console.log(`Sorting by ${key} in ${direction} order`);
  };

  // Handle row click
  const handleRowClick = (row: User, index: number) => {
    console.log("Clicked row:", row, "at index:", index);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">DataTable Example</h2>
      
      <DataTable<User>
        data={sampleData}
        columns={columns}
        pageSize={5}
        sortable={true}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onRowClick={handleRowClick}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default DataTableExample;
