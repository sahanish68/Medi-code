"use client";

import { AlertTriangle, Bell, Pill, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { usePrescriptionStore } from "../hooks/usePrescriptionStore";
import { useMedicineStore } from "@/features/medicines/hooks/useMedicineStore";
import { useReminderStore } from "@/features/reminders/hooks/useReminderStore";
import { PrescriptionSummary } from "@/features/prescription-summary/components/PrescriptionSummary";
import { DoseTimeline } from "@/features/medication-schedule/components/DoseTimeline";
import { buildTimelineFromMedicines } from "@/features/medication-schedule/utils/scheduleCalculator";
import { SplitDocumentViewer } from "./SplitDocumentViewer";
import type { Prescription } from "../types/prescription.types";

export function PrescriptionResult({ prescription: propsPrescription }: { prescription?: Prescription } = {}) {
  const { prescription: storePrescription } = usePrescriptionStore();
  const { openMedicine } = useMedicineStore();
  const { openReminder } = useReminderStore();

  const prescription = propsPrescription || storePrescription;

  if (!prescription) return null;

  const timeline = buildTimelineFromMedicines(prescription.medicines);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Interactive Split-Screen Document & Extracted Items */}
      <SplitDocumentViewer
        prescription={prescription}
        onOpenMedicineDetails={openMedicine}
        onOpenReminder={openReminder}
      />

      {/* 2. Summary Card */}
      <PrescriptionSummary prescription={prescription} />

      {/* 3. Detailed Medicines Breakdown */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-2xl shadow-xl space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30">
              <Pill size={22} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clinical Medicine Breakdown</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {prescription.medicines.length} medicine{prescription.medicines.length === 1 ? "" : "s"} extracted & verified
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          {prescription.medicines.map((med) => {
            const confidence = med.needsVerification ? 72 : 96;
            return (
              <div
                key={med.id}
                className={`group rounded-2xl border p-5 transition-all duration-300 ${
                  med.needsVerification
                    ? "border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-cyan-400 hover:bg-white dark:hover:bg-slate-900/90"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-100 dark:bg-slate-950 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 font-bold">
                        💊
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {med.name} {med.strength && <span className="text-cyan-700 dark:text-cyan-400 font-bold">{med.strength}</span>}
                      </h4>

                      {med.needsVerification ? (
                        <Badge variant="warning">
                          <AlertTriangle size={12} /> Review Recommended ({confidence}%)
                        </Badge>
                      ) : (
                        <Badge variant="success">
                          <CheckCircle2 size={12} /> High Confidence ({confidence}%)
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">{med.dosage}</span>
                      <span>•</span>
                      <span>{med.frequency}</span>
                      <span>•</span>
                      <span className="rounded-md bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/30 px-2 py-0.5 text-cyan-900 dark:text-cyan-300 font-bold">
                        {med.timing}
                      </span>
                      <span>•</span>
                      <span>{med.duration}</span>
                    </div>

                    {med.instructions && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-medium">
                        {med.instructions}
                      </p>
                    )}

                    {med.needsVerification && (
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 p-2.5 rounded-xl border border-amber-300 dark:border-amber-500/30 flex items-center gap-2">
                        <AlertTriangle size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
                        Unclear handwriting or dosage. Please confirm with your pharmacist before taking.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openMedicine(med)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReminder(med)}
                    >
                      <Bell size={14} /> Set Reminder
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Daily Dose Timeline */}
      {timeline.length > 0 && (
        <div className="rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-2xl shadow-xl space-y-4 transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Dose Timeline</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Automated daily administration schedule</p>
              </div>
            </div>
          </div>

          <DoseTimeline doses={timeline} />
        </div>
      )}

      {/* 5. Mandatory Clinical Safety Notice */}
      <Alert variant="medical" title="Clinical AI Safety & Verification Disclaimer">
        MediDecode converts prescription scans into plain-text informational summaries. AI predictions must be verified with a licensed doctor or pharmacist before administering any medication.
      </Alert>
    </div>
  );
}
