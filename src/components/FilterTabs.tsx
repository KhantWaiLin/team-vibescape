import React from "react";

export interface FilterTab {
  id: string;
  label: string;
  count: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-[var(--color-light-surface)] rounded-full p-1.5 flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === tab.id
              ? "bg-white text-[var(--color-green-700)] shadow-md"
              : "text-[var(--color-black-600)] hover:text-[var(--color-black-700)]"
          }`}
        >
          {tab.label}
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              activeTab === tab.id
                ? "bg-[var(--color-green-100)] text-[var(--color-green-600)]"
                : "bg-[var(--color-green-100)] text-[var(--color-green-600)]"
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
