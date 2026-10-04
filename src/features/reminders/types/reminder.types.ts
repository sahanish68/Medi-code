export type ReminderNotificationType = "browser" | "push" | "email" | "whatsapp";

export interface Reminder {
  id: string;
  userId?: string;
  medicineId: string;
  medicineName?: string;
  scheduleId?: string | null;
  title: string;
  reminderTime: string; // HH:mm or "08:00 AM"
  days: string[]; // ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  notificationType: ReminderNotificationType;
  createdAt?: string;
}

export interface ReminderInput {
  medicineId: string;
  medicineName?: string;
  title: string;
  reminderTime: string;
  days?: string[];
  startDate?: string;
  endDate?: string;
  notificationType?: ReminderNotificationType;
}
