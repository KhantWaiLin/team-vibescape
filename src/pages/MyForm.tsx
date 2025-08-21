import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	SearchBar,
	CategoryDropdown,
	FilterTabs,
	FormCard,
	Pagination,
} from "../components";
import { filterTabs, getApiStatus } from "../const/const";
import { API_ENDPOINTS, apiService } from "../services/api";
import type { FormStatus } from "../utils/statusUtils";

const MyForm: React.FC = () => {
	const [activeTab, setActiveTab] = useState("published");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [apiData, setApiData] = useState<any | null>(null);
	const [searchKeyword, setSearchKeyword] = useState("");
	const isInitialMount = useRef(true);
	const navigate = useNavigate();

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
					page,
					per_page,
					status,
				})
			);
			setApiData(response);
		} catch (error) {
			console.error("Error fetching forms:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch on dependency changes
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		}
		fetchForms(currentPage, 10, searchKeyword, getApiStatus(activeTab));
	}, [currentPage, activeTab, searchKeyword]);

	const handleNewForm = () => {
		navigate("/create-form");
	};

	const handleTabChange = (tabId: string) => {
		if (tabId === activeTab) return;
		setActiveTab(tabId);
		if (currentPage !== 1) setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		if (page === currentPage) return;
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleSearch = (keyword: string) => {
		if (keyword === searchKeyword) return;
		setSearchKeyword(keyword);
		if (currentPage !== 1) setCurrentPage(1);
	};

	const handleEditForm = (formId: number) => {
		navigate(`/create-form/${formId}`);
	};

	// Map API data to FormCard props
	const forms =
		apiData?.data.map((form: any) => ({
			id: form.id,
			title: form.title || "Untitled Form",
			description: form.description || "No description available",
			category: form.category?.name || form.category || "General",
			statusLabel: (form.status as FormStatus) || undefined,
			statusColor: undefined,
			editedText: `Updated ${new Date(
				form.updated_at || form.created_at
			).toLocaleDateString()}`,
			participantsCount: form.participants_count || 0,
			viewsCount: form.views_count || 0,
			username: form.username || "User",
		})) || [];
	
	return (
		<div className="min-h-screen">
			<div className="bg-light-bg p-6">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-8">
					{/* Title */}
					<h1 className="text-3xl font-bold text-[var(--color-black-900)]">
						My Form
					</h1>

					{/* New Form Button */}
					<button
						onClick={handleNewForm}
						className="inline-flex items-center gap-3 bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-[var(--color-light-text-inverse)] px-6 py-3 rounded-lg font-semibold transition-colors"
					>
						<div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
							<span className="text-[var(--color-green-600)] text-lg font-bold">
								+
							</span>
						</div>
						New Form
					</button>
				</div>

				{/* Filter Section */}
				<div className="mb-8">
					{/* Status Filter Tabs */}
					<div className="mb-6 flex justify-between">
						<FilterTabs
							tabs={filterTabs}
							activeTab={activeTab}
							onTabChange={handleTabChange}
						/>
						<div className="flex flex-col sm:flex-row gap-4">
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
				</div>

				{/* Content Area */}
				<div className="p-6 pt-0">
					{loading ? (
						<div className="flex justify-center py-12">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-green-600)]"></div>
						</div>
					) : (
						<>
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
										username={form.username}
										onEdit={() => handleEditForm(form.id)}
									/>
								))}
							</div>

							{/* Pagination */}
							{apiData && (
								<div className="mt-8">
									<Pagination
										currentPage={apiData.meta?.current_page ?? currentPage}
										lastPage={apiData.meta?.last_page ?? 1}
										total={apiData.meta?.total ?? forms.length}
										perPage={apiData.meta?.per_page ?? 10}
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

export default MyForm;
