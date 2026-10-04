"use server";

import { createClient } from "@/lib/supabase/server";
import type { Reminder, ReminderInput } from "../types/reminder.types";
import { generateId } from "@/lib/utils/id";

export async function createReminderAction(input: ReminderInput): Promise<{
  success: boolean;
  reminder?: Reminder;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const reminderId = generateId();

    const reminder: Reminder = {
      id: reminderId,
      medicineId: input.medicineId,
      medicineName: input.medicineName,
      title: input.title,
      reminderTime: input.reminderTime,
      days: input.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      startDate: input.startDate || new Date().toISOString().split("T")[0],
      endDate: input.endDate,
      enabled: true,
      notificationType: input.notificationType || "browser",
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        reminder.userId = user.id;
        await (supabase as any).from("reminders").insert({
          id: reminderId,
          user_id: user.id,
          medicine_id: input.medicineId,
          title: input.title,
          reminder_time: input.reminderTime,
          days: reminder.days,
          start_date: reminder.startDate,
          end_date: reminder.endDate,
          enabled: true,
          notification_type: reminder.notificationType
        });
      }
    }

    return { success: true, reminder };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteReminderAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("reminders").delete().eq("id", id).eq("user_id", user.id);
      }
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleReminderAction(id: string, enabled: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("reminders").update({ enabled }).eq("id", id).eq("user_id", user.id);
      }
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
