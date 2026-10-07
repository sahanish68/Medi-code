"use client";

import { Upload, FilePlus, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function PrescriptionUpload() {
  const { openUpload } = usePrescriptionStore();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between group transition-colors duration-300">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
            <FilePlus size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Decode Doctor Prescription</h3>
              <Sparkles size={14} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Upload JPG, PNG, or PDF images to extract dosage, strength, and schedule.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between font-medium">
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" /> Private OCR Analysis
          </span>
          <span className="font-mono font-bold text-[10px] text-cyan-700 dark:text-cyan-400">READY</span>
        </div>
      </div>

      <Button
        onClick={openUpload}
        variant="glow"
        className="mt-6 w-full shadow-md"
      >
        <Upload size={17} /> Upload & Decode Now
      </Button>
    </div>
  );
}
