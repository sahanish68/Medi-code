"use client";

import { Bell, Plus, AlarmClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { useReminders } from "@/features/reminders/hooks/useReminders";

export function UpcomingReminders() {
  const { setActiveTab } = useAppStore();
  const { reminders } = useReminders();
  const activeReminders = reminders.filter((r) => r.enabled);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <Bell size={18} className="text-teal-600" /> Upcoming Reminders
        </h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveTab("reminders")}
          className="text-xs"
        >
          <Plus size={14} /> Add Reminder
        </Button>
      </div>

      {activeReminders.length > 0 ? (
        <div className="mt-4 space-y-2.5">
          {activeReminders.slice(0, 3).map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-100 text-blue-800">
                  <AlarmClock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{reminder.title}</h4>
                  <p className="text-xs text-slate-500">{reminder.medicineName}</p>
                </div>
              </div>
              <span className="font-bold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                {reminder.reminderTime}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
          <Bell size={26} className="mx-auto text-slate-300" />
          <p className="mt-2 text-sm font-medium">No active medicine reminders set.</p>
          <p className="mt-1 text-xs text-slate-400">Set browser reminders to never miss a dose.</p>
        </div>
      )}
    </Card>
  );
}
