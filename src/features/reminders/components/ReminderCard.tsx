"use client";

import { Bell, Clock, Trash2, Calendar } from "lucide-react";
import type { Reminder } from "../types/reminder.types";

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onToggle, onDelete }: ReminderCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        reminder.enabled
          ? "border-teal-200 bg-white shadow-xs"
          : "border-slate-200 bg-slate-50/70 opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
              reminder.enabled ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-500"
            }`}
          >
            <Bell size={18} />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">{reminder.title}</h4>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <Clock size={13} />
              <span>{reminder.reminderTime}</span>
              <span>•</span>
              <span className="text-slate-500 capitalize">{reminder.notificationType} notification</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {reminder.days.map((day) => (
                <span
                  key={day}
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={reminder.enabled}
            onClick={() => onToggle(reminder.id)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              reminder.enabled ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                reminder.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>

          <button
            onClick={() => onDelete(reminder.id)}
            aria-label="Delete reminder"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
