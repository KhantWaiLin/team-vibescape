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
} from "../assets/icons/icons.tsx";

export const navItems = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/templates", label: "Templates", icon: fileIcon },
  { path: "/my-forms", label: "My Forms", icon: inboxIcon },
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
    label: "Email",
    icon: emailIcon,
    question_type: "email",
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
  {
    label: "Time",
    icon: timeIcon,
    question_type: "time",
  },
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
