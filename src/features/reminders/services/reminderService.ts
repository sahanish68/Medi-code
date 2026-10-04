import type { Reminder, ReminderInput } from "../types/reminder.types";
import { generateId } from "@/lib/utils/id";

const REMINDER_STORAGE_KEY = "medidecode_user_reminders";

export class ReminderService {
  /**
   * Request browser notification permission
   */
  static async requestNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "denied";
    }
    return await Notification.requestPermission();
  }

  /**
   * Check if notifications are enabled
   */
  static hasNotificationPermission(): boolean {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    return Notification.permission === "granted";
  }

  /**
   * Trigger a test notification
   */
  static showNotification(title: string, options?: NotificationOptions): boolean {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options
      });
      return true;
    }
    return false;
  }

  /**
   * Load reminders from local persistent store (with server fallback)
   */
  static getLocalReminders(): Reminder[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(REMINDER_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  /**
   * Save reminders
   */
  static saveLocalReminders(reminders: Reminder[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(reminders));
    } catch (err) {
      console.error("Failed to save reminders:", err);
    }
  }

  /**
   * Create a new reminder
   */
  static createReminder(input: ReminderInput): Reminder {
    const reminder: Reminder = {
      id: generateId(),
      medicineId: input.medicineId,
      medicineName: input.medicineName || "Prescribed Medicine",
      title: input.title,
      reminderTime: input.reminderTime,
      days: input.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      startDate: input.startDate || new Date().toISOString().split("T")[0],
      endDate: input.endDate,
      enabled: true,
      notificationType: input.notificationType || "browser",
      createdAt: new Date().toISOString()
    };

    const existing = this.getLocalReminders();
    this.saveLocalReminders([reminder, ...existing]);
    return reminder;
  }

  /**
   * Toggle reminder enabled state
   */
  static toggleReminder(id: string): Reminder[] {
    const list = this.getLocalReminders().map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    this.saveLocalReminders(list);
    return list;
  }

  /**
   * Delete reminder
   */
  static deleteReminder(id: string): Reminder[] {
    const list = this.getLocalReminders().filter((r) => r.id !== id);
    this.saveLocalReminders(list);
    return list;
  }
}
