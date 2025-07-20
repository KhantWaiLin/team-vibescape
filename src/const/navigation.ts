import {
  homeIcon,
  fileIcon,
  inboxIcon,
  layerIcon,
  trashIcon,
} from "../assets/icons/icons.tsx";

export const navItems = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/templates", label: "Templates", icon: fileIcon },
  { path: "/my-forms", label: "My Forms", icon: inboxIcon },
  { path: "/draft", label: "Draft", icon: layerIcon },
  { path: "/trash", label: "Transh", icon: trashIcon },
];
