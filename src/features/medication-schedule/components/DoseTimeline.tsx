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
      <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        No active scheduled doses for today.
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-cyan-500/30 ml-4 pl-6 space-y-6">
      {doses.map((dose, idx) => {
        const key = `${dose.medicineId}-${dose.time}-${idx}`;
        const isTaken = takenMap[key] || false;

        return (
          <div key={key} className="relative group">
            {/* Timeline node */}
            <div
              className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 transition-all duration-300 ${
                isTaken
                  ? "border-emerald-400 bg-emerald-500 text-white shadow-xs"
                  : "border-cyan-500 bg-white dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 shadow-xs"
              }`}
            >
              {isTaken ? <Check size={14} className="font-bold" /> : <div className="h-2 w-2 rounded-full bg-cyan-500" />}
            </div>

            <div
              onClick={() => toggleTaken(key)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                isTaken
                  ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 opacity-70"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 px-2.5 py-1 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                    <Clock size={13} /> {dose.time}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {dose.medicineName}
                  </span>
                  {dose.strength && (
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">({dose.strength})</span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-semibold">
                    <Utensils size={13} className="text-amber-600 dark:text-amber-400" />
                    {dose.timing}
                  </span>
                  <span>•</span>
                  <span className="text-slate-500 dark:text-slate-400">{dose.dosage}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
