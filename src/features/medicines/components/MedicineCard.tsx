"use client";

import { Bell, Pill, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Medicine } from "@/types/medicine";
import { useMedicineStore } from "../hooks/useMedicineStore";
import { useReminderStore } from "@/features/reminders/hooks/useReminderStore";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const { openMedicine } = useMedicineStore();
  const { openReminder } = useReminderStore();

  const isVerified = medicine.confidence.toLowerCase().includes("high") || medicine.confidence.includes("9") || medicine.confidence.includes("8");

  return (
    <Card hoverEffect className="group relative overflow-hidden border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/80 backdrop-blur-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-3.5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 group-hover:rotate-45 transition-transform duration-300">
          <Pill size={22} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {medicine.name}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border backdrop-blur-md ${
                isVerified
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40"
                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/40"
              }`}
            >
              {medicine.confidence}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{medicine.strength}</span> • {medicine.dosage}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
        <Info label="Frequency" value={medicine.frequency} />
        <Info label="Duration" value={medicine.duration} />
        <Info label="Timing" value={medicine.timing} />
        <Info label="Route" value={medicine.route} />
      </div>

      <div className="mt-5 flex gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800/80">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => openMedicine(medicine)}>
          View Details
        </Button>
        <Button variant="outline" size="sm" onClick={() => openReminder(medicine)}>
          <Bell size={14} /> Reminder
        </Button>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-900/80 p-2.5 border border-slate-200 dark:border-slate-800/80">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-0.5 font-bold text-slate-800 dark:text-slate-200 truncate">{value}</div>
    </div>
  );
}
