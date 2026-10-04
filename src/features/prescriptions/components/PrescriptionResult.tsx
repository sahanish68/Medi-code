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
import type { Prescription } from "../types/prescription.types";

export function PrescriptionResult({ prescription: propsPrescription }: { prescription?: Prescription } = {}) {
  const { prescription: storePrescription } = usePrescriptionStore();
  const { openMedicine } = useMedicineStore();
  const { openReminder } = useReminderStore();

  const prescription = propsPrescription || storePrescription;

  if (!prescription) return null;

  const timeline = buildTimelineFromMedicines(prescription.medicines);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Summary Card */}
      <PrescriptionSummary prescription={prescription} />

      {/* 2. Medicines Breakdown */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
              <Pill size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Extracted Medicines</h3>
              <p className="text-xs text-slate-500">
                {prescription.medicines.length} medicine{prescription.medicines.length === 1 ? "" : "s"} identified
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {prescription.medicines.map((med) => (
            <div
              key={med.id}
              className={`rounded-2xl border p-4 transition-all ${
                med.needsVerification
                  ? "border-amber-200 bg-amber-50/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {med.name} {med.strength && <span className="text-teal-700 font-semibold">{med.strength}</span>}
                    </h4>

                    {med.needsVerification ? (
                      <Badge variant="warning">
                        <AlertTriangle size={12} /> Needs Verification
                      </Badge>
                    ) : (
                      <Badge variant="success">
                        <CheckCircle2 size={12} /> High Confidence
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                    <span className="font-medium text-slate-800">{med.dosage}</span>
                    <span>•</span>
                    <span>{med.frequency}</span>
                    <span>•</span>
                    <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-teal-800 font-medium">
                      {med.timing}
                    </span>
                    <span>•</span>
                    <span>{med.duration}</span>
                  </div>

                  {med.instructions && (
                    <p className="mt-2 text-xs text-slate-500">{med.instructions}</p>
                  )}

                  {med.needsVerification && (
                    <p className="mt-2 text-xs font-semibold text-amber-800">
                      ⚠ Unclear handwriting or dosage. Please confirm with your pharmacist or doctor before taking.
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
          ))}
        </div>
      </div>

      {/* 3. Today's Medicine Taking Schedule */}
      {timeline.length > 0 && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-50 text-purple-700">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Today&apos;s Medicine Schedule</h3>
                <p className="text-xs text-slate-500">Auto-generated daily dose timeline</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <DoseTimeline doses={timeline} />
          </div>
        </div>
      )}

      {/* 4. Mandatory Clinical Safety Notice */}
      <Alert variant="medical" title="Medical Safety & Responsibility Notice">
        MediDecode provides informational assistance and does not replace advice from a qualified doctor or pharmacist.
        Always verify prescription details, dosage, medicine substitutions, and safety information with a healthcare professional before taking any medication.
      </Alert>
    </div>
  );
}
