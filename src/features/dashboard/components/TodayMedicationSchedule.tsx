"use client";

import { Clock, Pill, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function TodayMedicationSchedule() {
  const { prescription } = usePrescriptionStore();
  const medicines = prescription?.medicines || [];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <Clock size={18} className="text-teal-600" /> Today's Medicine Schedule
        </h2>
        <span className="text-xs font-semibold text-slate-500">{medicines.length} Medicines</span>
      </div>

      {medicines.length > 0 ? (
        <div className="mt-4 space-y-2.5">
          {medicines.map((med, idx) => (
            <div
              key={med.id || idx}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-100 text-teal-800 font-bold text-xs">
                  {idx === 0 ? "08:00 AM" : idx === 1 ? "02:00 PM" : "08:00 PM"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{med.name} {med.strength || ""}</h4>
                  <p className="text-xs text-slate-500">
                    {med.dosage || "1 tablet"} • {med.timing || "After food"}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                <Pill size={12} className="text-teal-600" /> {med.frequency || "Daily"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
          <CheckCircle2 size={28} className="mx-auto text-slate-300" />
          <p className="mt-2 text-sm font-medium">No doses scheduled for today.</p>
          <p className="mt-1 text-xs text-slate-400">Decoded prescription schedules will appear here automatically.</p>
        </div>
      )}
    </Card>
  );
}
