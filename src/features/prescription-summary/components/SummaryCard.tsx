import { Calendar, User, Stethoscope, Clock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PrescriptionSummaryData } from "../types/summary.types";

export function SummaryCard({ summary }: { summary: PrescriptionSummaryData }) {
  return (
    <Card className="border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/80 backdrop-blur-2xl shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Sparkles size={13} /> Decoded Clinical Summary
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {summary.doctorName || "Treating Physician"}
          </h2>
        </div>

        <Badge variant={summary.requiresDoctorVerification ? "warning" : "success"}>
          {summary.requiresDoctorVerification ? "Verification Recommended" : "Decoded with High Confidence"}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <Calendar size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Date</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {summary.prescriptionDate || "Not recorded"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
            <Stethoscope size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Diagnosis</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
              {summary.diagnosis || "Clinical condition"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Duration</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {summary.treatmentDuration}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400">
            <User size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Medicines</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {summary.totalMedicines} Prescribed
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 p-4 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
        <span className="font-bold text-cyan-700 dark:text-cyan-300">Summary: </span>
        {summary.simpleSummary}
      </div>
    </Card>
  );
}
