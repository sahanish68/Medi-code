"use client";

import { FileText, ArrowRight, Calendar, UserCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function RecentPrescriptions() {
  const { setActiveTab } = useAppStore();
  const { prescription } = usePrescriptionStore();

  return (
    <Card hoverEffect className="border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-base">
          <FileText size={18} className="text-cyan-700 dark:text-cyan-400" /> Recent Prescriptions
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
        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4 transition-all hover:border-cyan-400">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-900 dark:text-emerald-300">
                <Sparkles size={11} /> {prescription.status.toUpperCase()}
              </span>
              <h3 className="mt-2 font-extrabold text-slate-900 dark:text-white text-base">{prescription.fileName}</h3>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-700 dark:text-slate-300">
            {prescription.doctorName && (
              <span className="flex items-center gap-1.5 font-bold text-cyan-800 dark:text-cyan-300">
                <UserCheck size={14} className="text-cyan-600 dark:text-cyan-400" /> {prescription.doctorName}
              </span>
            )}
            {prescription.prescriptionDate && (
              <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <Calendar size={14} className="text-slate-500" /> {prescription.prescriptionDate}
              </span>
            )}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 bg-white dark:bg-slate-950/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-medium">
            {prescription.summary}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full justify-between"
            onClick={() => setActiveTab("prescriptions")}
          >
            <span>Open Prescription Details</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300">No recent prescription decoded yet.</p>
          <p className="mt-1 text-[11px] text-slate-500">Upload a doctor prescription to view structured insights here.</p>
        </div>
      )}
    </Card>
  );
}
