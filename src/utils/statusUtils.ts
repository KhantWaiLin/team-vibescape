/**
 * Status utility functions for form management
 * 
 * This module provides utilities for handling form statuses including:
 * - Status colors and styling
 * - Status labels and formatting
 * - Status workflow and transitions
 * - Status icons and visual indicators
 */

export type FormStatus = 'published' | 'approved' | 'pending_approval' | 'rejected' | 'draft';

/**
 * Get the CSS classes for styling a status badge
 * 
 * Colors chosen for good contrast and semantic meaning:
 * - Published: Green (success, live)
 * - Approved: Blue (trust, verified)
 * - Pending: Amber (waiting, attention)
 * - Rejected: Red (error, stopped)
 * - Draft: Gray (neutral, incomplete)
 * 
 * @param status - The form status
 * @returns CSS classes for styling the status badge
 */
export const getStatusColor = (status: FormStatus): string => {
  switch (status) {
    case 'published':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'approved':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'pending_approval':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'draft':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

/**
 * Get a human-readable label for a status
 * 
 * @param status - The form status
 * @returns Capitalized status label
 */
export const getStatusLabel = (status: FormStatus): string => {
  const statusMap: Record<FormStatus, string> = {
    'published': 'Published',
    'approved': 'Approved',
    'pending_approval': 'Pending',
    'rejected': 'Rejected',
    'draft': 'Draft'
  };
  
  return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Get the priority number for a status (useful for sorting)
 * 
 * @param status - The form status
 * @returns Priority number (lower = higher priority)
 */
export const getStatusPriority = (status: FormStatus): number => {
  const priorities: Record<FormStatus, number> = {
    'published': 1,
    'approved': 2,
    'pending_approval': 3,
    'draft': 4,
    'rejected': 5,
  };
  return priorities[status] || 999;
};

/**
 * Get an emoji icon for a status
 * 
 * @param status - The form status
 * @returns Emoji icon string
 */
export const getStatusIcon = (status: FormStatus): string => {
  switch (status) {
    case 'published':
      return '✅'; // Check mark
    case 'approved':
      return '👍'; // Thumbs up
    case 'pending_approval':
      return '⏳'; // Hourglass
    case 'rejected':
      return '❌'; // X mark
    case 'draft':
      return '📝'; // Memo
    default:
      return '📄'; // Document
  }
};

/**
 * Check if a status can be changed (is actionable)
 * 
 * @param status - The form status
 * @returns True if the status can be changed
 */
export const isStatusActionable = (status: FormStatus): boolean => {
  return ['draft', 'pending_approval'].includes(status);
};

/**
 * Get the next possible statuses in the workflow
 * 
 * @param currentStatus - The current form status
 * @returns Array of possible next statuses
 */
export const getNextPossibleStatuses = (currentStatus: FormStatus): FormStatus[] => {
  switch (currentStatus) {
    case 'draft':
      return ['pending_approval'];
    case 'pending_approval':
      return ['approved', 'rejected'];
    case 'approved':
      return ['published'];
    case 'rejected':
      return ['draft'];
    case 'published':
      return []; // Published is final
    default:
      return [];
  }
};
