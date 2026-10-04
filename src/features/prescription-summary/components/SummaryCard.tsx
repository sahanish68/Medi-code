import { Calendar, User, Stethoscope, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PrescriptionSummaryData } from "../types/summary.types";

export function SummaryCard({ summary }: { summary: PrescriptionSummaryData }) {
  return (
    <Card className="bg-linear-to-br from-white to-teal-50/30 border-teal-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Decoded Prescription Summary
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            {summary.doctorName || "Treating Physician"}
          </h2>
        </div>

        <Badge variant={summary.requiresDoctorVerification ? "warning" : "success"}>
          {summary.requiresDoctorVerification ? "Verification Recommended" : "Decoded with High Confidence"}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Calendar size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500">Date</div>
            <div className="text-sm font-semibold text-slate-800">
              {summary.prescriptionDate || "Not recorded"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700">
            <Stethoscope size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500">Diagnosis</div>
            <div className="text-sm font-semibold text-slate-800 line-clamp-1">
              {summary.diagnosis || "Clinical condition"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500">Duration</div>
            <div className="text-sm font-semibold text-slate-800">
              {summary.treatmentDuration}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-50 text-purple-700">
            <User size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-500">Total Medicines</div>
            <div className="text-sm font-semibold text-slate-800">
              {summary.totalMedicines} Prescribed
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-3.5 border border-slate-100 text-sm text-slate-700">
        <span className="font-semibold text-teal-900">Summary: </span>
        {summary.simpleSummary}
      </div>
    </Card>
  );
}
