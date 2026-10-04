"use client";

import { FileText, ArrowRight, Calendar, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function RecentPrescriptions() {
  const { setActiveTab } = useAppStore();
  const { prescription } = usePrescriptionStore();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <FileText size={18} className="text-teal-600" /> Recent Prescriptions
        </h2>
        {prescription && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveTab("prescriptions")}
            className="text-xs"
          >
            View All <ArrowRight size={14} />
          </Button>
        )}
      </div>

      {prescription ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:bg-slate-100/80">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                {prescription.status}
              </span>
              <h3 className="mt-2 font-bold text-slate-800">{prescription.fileName}</h3>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
            {prescription.doctorName && (
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <UserCheck size={14} className="text-teal-600" /> {prescription.doctorName}
              </span>
            )}
            {prescription.prescriptionDate && (
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Calendar size={14} className="text-teal-600" /> {prescription.prescriptionDate}
              </span>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-600 line-clamp-2">
            {prescription.summary}
          </p>

          <Button
            variant="secondary"
            className="mt-4 w-full justify-between bg-white text-teal-800 border border-slate-200 hover:bg-teal-50"
            onClick={() => setActiveTab("prescriptions")}
          >
            <span>Open Prescription Details</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
          <p className="text-sm font-medium">No prescription decoded yet.</p>
          <p className="mt-1 text-xs text-slate-400">Upload a doctor's prescription to view insights here.</p>
        </div>
      )}
    </Card>
  );
}
