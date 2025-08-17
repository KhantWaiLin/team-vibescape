import React from 'react';
import { getStatusColor, getStatusLabel, getStatusIcon, type FormStatus } from '../utils';

interface StatusBadgeProps {
  status: FormStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center gap-2 rounded-full border font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusClasses = getStatusColor(status);
  
  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${statusClasses} ${className}`}
      title={`Status: ${getStatusLabel(status)}`}
    >
      {showIcon && <span className="text-sm">{getStatusIcon(status)}</span>}
      <span>{getStatusLabel(status)}</span>
    </span>
  );
};

export default StatusBadge;
