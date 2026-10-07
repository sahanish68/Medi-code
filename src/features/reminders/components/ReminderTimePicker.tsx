"use client";

import { Clock } from "lucide-react";

interface ReminderTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  presetTimes?: string[];
}

export function ReminderTimePicker({
  value,
  onChange,
  presetTimes = ["08:00 AM", "01:30 PM", "08:00 PM", "09:30 PM"]
}: ReminderTimePickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Reminder Time
      </label>

      <div className="relative">
        <Clock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 08:00 AM"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {presetTimes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
              value === t
                ? "bg-cyan-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
