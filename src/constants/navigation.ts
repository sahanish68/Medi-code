import {
  Bell,
  FileText,
  HeartPulse,
  Hospital,
  Pill,
  Settings
} from "lucide-react";

export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: HeartPulse },
  { id: "prescriptions", label: "Prescriptions", icon: FileText },
  { id: "medicines", label: "Medicines", icon: Pill },
  { id: "reminders", label: "Reminders", icon: Bell },
  { id: "healthcare", label: "Nearby Healthcare", icon: Hospital },
  { id: "settings", label: "Settings", icon: Settings }
] as const;

export type NavigationId = (typeof navigationItems)[number]["id"];
