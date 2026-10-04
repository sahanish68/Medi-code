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
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
          <Clock size={20} />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">{medicineName}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-teal-800">
              Times: {schedule.times.join(", ")}
            </span>
            <span>•</span>
            <span>{schedule.foodInstruction || "Standard"}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
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
