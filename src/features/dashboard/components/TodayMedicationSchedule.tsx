"use client";

import { Clock, Pill, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function TodayMedicationSchedule() {
  const { prescription } = usePrescriptionStore();
  const medicines = prescription?.medicines || [];

  return (
    <Card hoverEffect className="border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-base">
          <Clock size={18} className="text-cyan-700 dark:text-cyan-400" /> Today's Dose Schedule
        </h2>
        <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-500/30">
          {medicines.length} ACTIVE
        </span>
      </div>

      {medicines.length > 0 ? (
        <div className="mt-4 space-y-2.5">
          {medicines.map((med, idx) => (
            <div
              key={med.id || idx}
              className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-16 place-items-center rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 font-mono text-xs font-bold border border-cyan-300 dark:border-cyan-500/30">
                  {idx === 0 ? "08:00 AM" : idx === 1 ? "02:00 PM" : "08:00 PM"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{med.name} {med.strength || ""}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {med.dosage || "1 tablet"} • {med.timing || "After food"}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-lg bg-white dark:bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                <Pill size={12} className="text-cyan-600 dark:text-cyan-400" /> {med.frequency || "Daily"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
          <CheckCircle2 size={28} className="mx-auto text-cyan-600 dark:text-cyan-500/40" />
          <p className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-300">No doses scheduled for today.</p>
          <p className="mt-1 text-[11px] text-slate-500">Decoded prescription schedules appear here automatically.</p>
        </div>
      )}
    </Card>
  );
}
