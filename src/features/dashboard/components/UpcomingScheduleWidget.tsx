"use client";

import { useState } from "react";
import { Clock, Calendar, CheckCircle2, Pill, Bell, ArrowRight, AlarmClock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { useReminders } from "@/features/reminders/hooks/useReminders";
import { useAppStore } from "@/features/app/hooks/useAppStore";

export function UpcomingScheduleWidget() {
  const { prescription } = usePrescriptionStore();
  const { reminders, toggleReminder } = useReminders();
  const { setActiveTab } = useAppStore();

  const medicines = prescription?.medicines || [];
  const [takenStatus, setTakenStatus] = useState<Record<string, boolean>>({});

  const toggleDoseTaken = (id: string) => {
    setTakenStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock next upcoming dose based on active medicines or reminders
  const nextDose = medicines.length > 0
    ? {
        name: medicines[0].name,
        strength: medicines[0].strength || "500 mg",
        time: "09:30 PM",
        dosage: medicines[0].dosage || "1 tablet",
        timing: medicines[0].timing || "After dinner",
        id: medicines[0].id
      }
    : null;

  return (
    <Card className="space-y-6 border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
            <Clock size={22} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Upcoming Medication Schedule</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Real-time daily dosing timeline and notification status
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={() => setActiveTab("reminders")}>
          <Bell size={15} /> Manage All Reminders <ArrowRight size={14} />
        </Button>
      </div>

      {/* Hero Alert: Next Immediate Dose */}
      {nextDose && (
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-slate-950 p-4 sm:p-5 text-white shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <AlarmClock size={24} className="animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-cyan-400/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-cyan-300 border border-cyan-400/30">
                    NEXT UPCOMING DOSE • TODAY AT {nextDose.time}
                  </span>
                </div>
                <h4 className="mt-1 text-lg font-bold text-white">
                  {nextDose.name} <span className="text-cyan-300">({nextDose.strength})</span>
                </h4>
                <p className="mt-0.5 text-xs text-slate-300">
                  Take {nextDose.dosage} • {nextDose.timing}
                </p>
              </div>
            </div>

            <Button
              variant={takenStatus[nextDose.id] ? "secondary" : "glow"}
              size="sm"
              onClick={() => toggleDoseTaken(nextDose.id)}
              className="shrink-0"
            >
              <CheckCircle2 size={16} />
              {takenStatus[nextDose.id] ? "Completed ✅" : "Mark as Taken"}
            </Button>
          </div>
        </div>
      )}

      {/* Full Today Schedule Breakdown */}
      {medicines.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Today&apos;s Full Regimen Timeline ({medicines.length} Prescribed)
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {medicines.map((med, idx) => {
              const timeSlot = idx === 0 ? "08:00 AM" : idx === 1 ? "02:00 PM" : "08:30 PM";
              const isDone = takenStatus[med.id] || false;

              return (
                <div
                  key={med.id || idx}
                  className={`flex items-center justify-between rounded-2xl p-4 border transition-all ${
                    isDone
                      ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 opacity-75"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDoseTaken(med.id)}
                      className={`grid h-8 w-8 place-items-center rounded-xl border transition-colors cursor-pointer ${
                        isDone
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-cyan-500"
                      }`}
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">{timeSlot}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{med.timing || "After meals"}</span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{med.name} {med.strength || ""}</h5>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    isDone
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30"
                      : "bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30"
                  }`}>
                    {isDone ? "Taken" : "Scheduled"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
          <Pill size={32} className="mx-auto text-cyan-500/50 mb-2" />
          <h4 className="font-bold text-slate-900 dark:text-white">No active prescription schedule loaded.</h4>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Upload your medical prescription to extract structured dosages, timings, and generate your interactive schedule automatically.
          </p>
          <div className="mt-4">
            <Button variant="glow" size="sm" onClick={() => setActiveTab("prescriptions")}>
              Upload Prescription Now
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
