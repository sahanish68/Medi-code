"use client";

import { Calendar, Clock, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { MedicationSchedule } from "../types/schedule.types";

interface ScheduleCardProps {
  schedule: MedicationSchedule;
  medicineName: string;
  onEdit: (schedule: MedicationSchedule) => void;
}

export function ScheduleCard({ schedule, medicineName, onEdit }: ScheduleCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
          <Clock size={20} />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{medicineName}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-cyan-700 dark:text-cyan-300">
              Times: {schedule.times.join(", ")}
            </span>
            <span>•</span>
            <span>{schedule.foodInstruction || "Standard"}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar size={13} />
            <span>
              {schedule.startDate} {schedule.endDate ? `to ${schedule.endDate}` : ""}
            </span>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="sm" onClick={() => onEdit(schedule)}>
        <Edit2 size={14} /> Adjust Time
      </Button>
    </div>
  );
}
