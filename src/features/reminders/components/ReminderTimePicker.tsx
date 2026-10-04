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
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        Reminder Time
      </label>

      <div className="relative">
        <Clock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 08:00 AM"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {presetTimes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              value === t
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
