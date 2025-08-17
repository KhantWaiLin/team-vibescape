// Form and Question Types
export interface Question {
  id?: number;
  question_text: string;
  question_type: string;
  is_required: number;
  options: string | null;
  placeholder?: string;
  order?: number;
}

export interface FormData {
  title: string;
  description: string;
  questions: Question[];
}

// Component Props Types
export interface FormBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question | null) => void;
}

export interface FormCreateLayoutProps {
  children: React.ReactNode;
  questions?: Question[];
  onQuestionsChange?: (questions: Question[]) => void;
  selectedQuestion?: Question | null;
  onQuestionSelect?: (question: Question | null) => void;
}

export interface FormBuilderSidebarProps {
  isOpen: boolean;
  onAddQuestion: (questionType: string) => void;
}

export interface FormSettingsSidebarProps {
  isOpen: boolean;
  selectedQuestion: Question | null;
  onQuestionUpdate: (question: Question) => void;
}

export interface FloatingButtonProps {
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export interface QuestionTypeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  disabled?: boolean;
}

// Layout Component Props Types
export interface LayoutProps {
  children?: React.ReactNode;
}

export interface HeaderProps {
  onSidebarToggle: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Question Type Constants
export type QuestionType = 
  | 'text'
  | 'paragraph'
  | 'dropdown'
  | 'datetime'
  | 'multiple_choice'
  | 'checkboxes'
  | 'rating'
  | 'file'
  | 'title_text'
  | 'divider'
  | 'number';

// Form Submission Types
export interface FormSubmissionData {
  [key: string]: any;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form Types
export interface Form {
  id: number;
  title: string;
  description: string;
  status: 'published' | 'approved' | 'pending' | 'rejected' | 'draft';
  category: string;
  updated_at: string;
  created_at: string;
  participants_count?: number;
  views_count?: number;
  user?: {
    name: string;
    email: string;
  };
}

// User Types
export interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 