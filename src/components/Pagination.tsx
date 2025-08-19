import React from "react";

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination Component
 * 
 * A pagination component that displays page numbers and navigation controls
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   lastPage={10}
 *   total={100}
 *   perPage={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  total,
  perPage,
  onPageChange,
  className = "",
}) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = lastPage - 3; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Page Info */}
      <div className="text-sm text-[var(--color-black-600)]">
        Showing {startItem} to {endItem} of {total} results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-[var(--color-black-600)] bg-white border border-[var(--color-light-border)] rounded-lg hover:bg-[var(--color-light-bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-[var(--color-black-400)]">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[var(--color-green-600)] text-white'
                      : 'text-[var(--color-black-600)] bg-white border border-[var(--color-light-border)] hover:bg-[var(--color-light-bg)]'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-3 py-2 text-sm font-medium text-[var(--color-black-600)] bg-white border border-[var(--color-light-border)] rounded-lg hover:bg-[var(--color-light-bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
