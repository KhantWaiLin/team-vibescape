import {
  homeIcon,
  fileIcon,
  inboxIcon,
  layerIcon,
  trashIcon,
  typeIcon,
  paragraphIcon,
  dropdownIcon,
  dateIcon,
  checkboxIcon,
  radioIcon,
  numberIcon,
  timeIcon,
  fileUploadIcon,
  emailIcon,
  pinIcon,
  dividerIcon,
  submissionIcon,
} from "../assets/icons/icons.tsx";

export const navItems = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/templates", label: "Template", icon: fileIcon },
  { path: "/my-forms", label: "My Form", icon: inboxIcon },
  { path: "/draft", label: "Draft", icon: layerIcon },
  { path: "/trash", label: "Transh", icon: trashIcon },
];

export const adminNavItems = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/submission", label: "Submission", icon: submissionIcon },
  { path: "/templates", label: "Template", icon: fileIcon },
  { path: "/my-forms", label: "My Form", icon: inboxIcon },
  { path: "/draft", label: "Draft", icon: layerIcon },
  { path: "/trash", label: "Transh", icon: trashIcon },
];

export const questionsTypes = [
  {
    label: "Text Input",
    icon: typeIcon,
    question_type: "text",
  },
  {
    label: "Paragraph",
    icon: paragraphIcon,
    question_type: "paragraph",
  },
  {
    label: "Number",
    icon: numberIcon,
    question_type: "number",
  },
  {
    label: "Dropdown",
    icon: dropdownIcon,
    question_type: "dropdown",
  },
  {
    label: "Checkbox",
    icon: checkboxIcon,
    question_type: "checkboxes",
  },
  {
    label: "Radio Button",
    icon: radioIcon,
    question_type: "multiple_choice",
  },
  {
    label: "Date",
    icon: dateIcon,
    question_type: "datetime",
  },
  // {
  //   label: "Time",
  //   icon: timeIcon,
  //   question_type: "time",
  // },
  {
    label: "File Upload",
    icon: fileUploadIcon,
    question_type: "file",
  },
];

export const layoutBlocks = [
  {
    label: "Title Text",
    icon: pinIcon,
    question_type: "title_text",
  },
  {
    label: "Divider",
    icon: dividerIcon,
    question_type: "divider",
  },
];

export const filterTabs = [
  { id: "pending", label: "Pending", count: 4, apiStatus: "pending_approval" },
  { id: "published", label: "Published", count: 4, apiStatus: "published" },
  { id: "approved", label: "Approved", count: 2, apiStatus: "approved" },
  { id: "rejected", label: "Rejected", count: 1, apiStatus: "rejected" },
];

/**
 * Helper function to convert display status to API status
 * @param displayStatus - The status shown to users (e.g., "pending")
 * @returns The corresponding API status (e.g., "pending_approval")
 */
export const getApiStatus = (displayStatus: string): string | undefined => {
  const tab = filterTabs.find(tab => tab.id === displayStatus);
  return tab?.apiStatus;
};
