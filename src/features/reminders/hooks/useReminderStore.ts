"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Medicine } from "@/features/medicines/types/medicine.types";
import type { Reminder } from "../types/reminder.types";
import { ReminderService } from "../services/reminderService";
import { generateId } from "@/lib/utils/id";

export interface ReminderStore {
  reminders: Reminder[];
  selectedMedicine: Medicine | null;
  openReminder: (medicine: Medicine) => void;
  closeReminder: () => void;
  addReminder: (medicine: Medicine, time: string, days?: string[]) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

export const useReminderStore = create<ReminderStore>()(
  persist(
    (set, get) => ({
      reminders: [
        {
          id: "seed-rem-1",
          medicineId: "med-1",
          medicineName: "Paracetamol 650 mg",
          title: "Take Paracetamol 650 mg",
          reminderTime: "08:00 AM",
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          enabled: true,
          notificationType: "browser"
        },
        {
          id: "seed-rem-2",
          medicineId: "med-2",
          medicineName: "Pantoprazole 40 mg",
          title: "Take Pantoprazole 40 mg (Empty stomach)",
          reminderTime: "07:30 AM",
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          enabled: true,
          notificationType: "browser"
        }
      ],
      selectedMedicine: null,

      openReminder: (medicine: Medicine) => set({ selectedMedicine: medicine }),
      closeReminder: () => set({ selectedMedicine: null }),

      addReminder: (medicine: Medicine, time: string, days?: string[]) => {
        const newReminder: Reminder = {
          id: generateId(),
          medicineId: medicine.id,
          medicineName: medicine.name,
          title: `Take ${medicine.name} (${medicine.dosage || "1 dose"})`,
          reminderTime: time,
          days: days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          enabled: true,
          notificationType: "browser",
          createdAt: new Date().toISOString()
        };

        const updated = [newReminder, ...get().reminders];
        set({
          reminders: updated,
          selectedMedicine: null
        });

        // Request browser permission if not yet asked
        ReminderService.requestNotificationPermission();
      },

      toggleReminder: (id: string) => {
        set({
          reminders: get().reminders.map((r) =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
          )
        });
      },

      deleteReminder: (id: string) => {
        set({
          reminders: get().reminders.filter((r) => r.id !== id)
        });
      }
    }),
    {
      name: "medidecode-reminders-v2"
    }
  )
);
