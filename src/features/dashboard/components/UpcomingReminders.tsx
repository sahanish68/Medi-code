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
    <Card hoverEffect className="border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-base">
          <Bell size={18} className="text-cyan-700 dark:text-cyan-400" /> Upcoming Reminders
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
              className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30">
                  <AlarmClock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{reminder.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{reminder.medicineName}</p>
                </div>
              </div>
              <span className="font-mono font-bold text-xs text-cyan-900 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950 px-3 py-1 rounded-full border border-cyan-300 dark:border-cyan-500/30">
                {reminder.reminderTime}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
          <Bell size={26} className="mx-auto text-slate-400 dark:text-slate-600" />
          <p className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-300">No active medicine reminders set.</p>
          <p className="mt-1 text-[11px] text-slate-500">Set browser or push reminders to ensure zero missed doses.</p>
        </div>
      )}
    </Card>
  );
}
