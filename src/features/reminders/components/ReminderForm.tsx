"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ReminderTimePicker } from "./ReminderTimePicker";
import type { ReminderInput } from "../types/reminder.types";
import { generateId } from "@/lib/utils/id";

interface ReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: ReminderInput) => void;
  initialMedicineName?: string;
  initialMedicineId?: string;
}

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ReminderForm({
  isOpen,
  onClose,
  onSubmit,
  initialMedicineName = "",
  initialMedicineId
}: ReminderFormProps) {
  const medicineId = initialMedicineId || generateId();
  const [medicineName, setMedicineName] = useState(initialMedicineName);
  const [time, setTime] = useState("08:00 AM");
  const [selectedDays, setSelectedDays] = useState<string[]>(ALL_DAYS);
  const [schedulePattern, setSchedulePattern] = useState("daily");
  const [notificationType, setNotificationType] = useState<ReminderInput["notificationType"]>("browser");

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handlePatternChange = (pat: string) => {
    setSchedulePattern(pat);
    if (pat === "daily") {
      setSelectedDays(ALL_DAYS);
    } else if (pat === "weekdays") {
      setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
    } else if (pat === "weekends") {
      setSelectedDays(["Sat", "Sun"]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    onSubmit({
      medicineId,
      medicineName,
      title: `Take ${medicineName}`,
      reminderTime: time,
      days: selectedDays,
      notificationType
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Medicine Reminder"
      description="Set a daily or customized alert so you never miss a dose."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Medicine Name & Strength
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Paracetamol 650 mg"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 text-sm font-medium focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <ReminderTimePicker value={time} onChange={setTime} />

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Schedule Frequency
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "daily", label: "Every Day" },
              { id: "weekdays", label: "Mon - Fri" },
              { id: "weekends", label: "Weekends" }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePatternChange(p.id)}
                className={`rounded-xl border p-2 text-xs font-semibold transition cursor-pointer ${
                  schedulePattern === p.id
                    ? "border-cyan-500/50 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Repeat Days
          </label>
          <div className="flex justify-between gap-1">
            {ALL_DAYS.map((day) => {
              const active = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`h-9 w-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? "bg-cyan-600 text-white"
                      : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {day.slice(0, 2)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Save Reminder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
