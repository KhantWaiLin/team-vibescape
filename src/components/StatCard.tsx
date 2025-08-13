import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, className }) => {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-light-border)] shadow-sm p-6 ${className ?? ""}`}
    >
      <div className="text-sm font-medium text-[var(--color-black-700)]">{title}</div>
      <div className="mt-4 text-4xl font-semibold text-[var(--color-black-900)]">
        {value}
      </div>
      {subtitle ? (
        <div className="mt-2 text-sm text-[var(--color-black-500)]">{subtitle}</div>
      ) : null}
    </div>
  );
};

export default StatCard;


