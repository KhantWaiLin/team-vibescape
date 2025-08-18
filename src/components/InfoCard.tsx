import React from "react";

export interface InfoCardProps {
  /** The label text to display (can be clickable if onClick is provided) */
  label: string;
  /** The main value to display (usually a number or string) */
  value: string | number;
  /** Optional icon to display on the right side of the label */
  icon?: React.ReactNode;
  /** Additional CSS classes for styling */
  className?: string;
  /** Optional click handler - if provided, the label becomes clickable with underline */
  onClick?: () => void;
}

/**
 * InfoCard Component
 * 
 * A reusable card component that displays a label, value, and optional icon.
 * Perfect for displaying statistics, metrics, or key information.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <InfoCard
 *   label="Total Users"
 *   value={150}
 * />
 * 
 * // With icon
 * <InfoCard
 *   label="Active Projects"
 *   value={12}
 *   icon={<UserIcon />}
 * />
 * 
 * // Clickable label
 * <InfoCard
 *   label="View Details"
 *   value={25}
 *   icon={<ArrowIcon />}
 *   onClick={() => navigate('/details')}
 * />
 * ```
 */
const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon, className, onClick }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[var(--color-light-border)] shadow-sm p-6 ${className ?? ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div 
          className={`text-sm font-medium text-[var(--color-black-700)] ${onClick ? 'cursor-pointer hover:text-blue-600' : ''}`}
          onClick={onClick}
        >
          {onClick ? (
            <span className="border-b border-blue-500 hover:border-blue-700 transition-colors">
              {label}
            </span>
          ) : (
            label
          )}
        </div>
        {icon && (
          <div className="text-green-500">
            {icon}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-[var(--color-black-900)]">
        {value}
      </div>
    </div>
  );
};

export default InfoCard;
