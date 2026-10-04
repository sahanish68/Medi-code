"use client";

import { useState } from "react";
import { Check, Clock, Utensils } from "lucide-react";
import type { ScheduledDose } from "../types/schedule.types";

export function DoseTimeline({ doses }: { doses: ScheduledDose[] }) {
  const [takenMap, setTakenMap] = useState<Record<string, boolean>>({});

  const toggleTaken = (key: string) => {
    setTakenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!doses || doses.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-slate-500">
        No active scheduled doses for today.
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-teal-100 ml-4 pl-6 space-y-6">
      {doses.map((dose, idx) => {
        const key = `${dose.medicineId}-${dose.time}-${idx}`;
        const isTaken = takenMap[key] || false;

        return (
          <div key={key} className="relative group">
            {/* Timeline node */}
            <div
              className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 transition-all ${
                isTaken
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-teal-600 bg-white text-teal-600"
              }`}
            >
              {isTaken ? <Check size={14} /> : <div className="h-2 w-2 rounded-full bg-teal-600" />}
            </div>

            <div
              onClick={() => toggleTaken(key)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                isTaken
                  ? "border-emerald-200 bg-emerald-50/30 opacity-70"
                  : "border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
                    <Clock size={13} /> {dose.time}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {dose.medicineName}
                  </span>
                  {dose.strength && (
                    <span className="text-xs text-slate-500">({dose.strength})</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Utensils size={13} className="text-amber-600" />
                    {dose.timing}
                  </span>
                  <span>•</span>
                  <span>{dose.dosage}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
