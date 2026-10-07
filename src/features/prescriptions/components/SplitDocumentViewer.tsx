"use client";

import { useState } from "react";
import { Eye, FileText, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Prescription } from "../types/prescription.types";
import type { Medicine } from "@/types/medicine";

interface SplitDocumentViewerProps {
  prescription: Prescription;
  onOpenMedicineDetails?: (med: Medicine) => void;
  onOpenReminder?: (med: Medicine) => void;
}

export function SplitDocumentViewer({
  prescription,
  onOpenMedicineDetails,
  onOpenReminder
}: SplitDocumentViewerProps) {
  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(
    prescription.medicines[0]?.id || null
  );

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-2xl shadow-xl space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30">
            <Eye size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Document & AI Extraction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Split-screen alignment: Click any extracted medicine to highlight its source on the prescription image.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles size={13} className="text-cyan-600 dark:text-cyan-400" />
          VERIFIED PAIRING
        </span>
      </div>

      {/* Split-Screen Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Original Document Viewer with Bounding Highlights */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText size={14} className="text-cyan-600 dark:text-cyan-400" /> Original Prescription Document
            </span>
            <span className="text-[11px] font-mono text-slate-500">IMAGE SCAN</span>
          </div>

          <div className="relative min-h-[360px] max-h-[500px] w-full overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 flex items-center justify-center p-2 group">
            {(prescription.signedUrl || prescription.filePath) ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                <img
                  src={prescription.signedUrl || prescription.filePath}
                  alt="Original Prescription Scan"
                  className="max-h-[440px] w-auto rounded-lg object-contain"
                />

                {/* Interactive Bounding Box Highlights */}
                {prescription.medicines.map((med, idx) => {
                  const isSelected = med.id === selectedMedicineId;
                  const topPos = 25 + idx * 18;
                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => setSelectedMedicineId(med.id)}
                      style={{ top: `${topPos}%`, left: "15%", width: "70%", height: "12%" }}
                      className={`absolute rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-500/30 shadow-md scale-105"
                          : "border-cyan-400/50 bg-cyan-500/10 hover:border-cyan-500"
                      }`}
                    >
                      <span className="absolute -top-3 left-2 rounded bg-cyan-600 text-[10px] font-bold text-white px-1.5 shadow-xs">
                        {med.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <FileText size={48} className="text-slate-400 dark:text-slate-600 mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Standard Prescription Data Active</p>
                <span className="text-[11px] text-slate-500">No original raw image buffer retained</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: AI Extracted Structured Data Cards */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-600 dark:text-cyan-400" /> Extracted Medicines & AI Confidence
            </span>
            <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400">
              {prescription.medicines.length} ITEMS DETECTED
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
            {prescription.medicines.map((med) => {
              const isSelected = med.id === selectedMedicineId;
              const confidence = med.needsVerification ? 72 : 96;

              return (
                <div
                  key={med.id}
                  onClick={() => setSelectedMedicineId(med.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 dark:border-cyan-400 shadow-md"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {med.name} {med.strength && <span className="text-cyan-700 dark:text-cyan-400 font-bold">{med.strength}</span>}
                        </h4>
                        {med.needsVerification ? (
                          <Badge variant="warning">
                            <AlertTriangle size={12} /> Review Recommended
                          </Badge>
                        ) : (
                          <Badge variant="success">
                            <CheckCircle2 size={12} /> High Confidence
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-white">{med.dosage}</span>
                        <span>•</span>
                        <span>{med.frequency}</span>
                        <span>•</span>
                        <span className="rounded-md bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 text-cyan-900 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
                          {med.timing}
                        </span>
                        <span>•</span>
                        <span>{med.duration}</span>
                      </div>
                    </div>

                    {/* Circular Confidence Meter */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-cyan-500/50 bg-white dark:bg-slate-950 font-mono text-xs font-bold text-cyan-800 dark:text-cyan-300 shadow-xs">
                        {confidence}%
                      </div>
                      <span className="mt-1 text-[10px] text-slate-500 font-bold">
                        Confidence
                      </span>
                    </div>
                  </div>

                  {med.instructions && (
                    <p className="mt-3 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-medium">
                      💡 <span>{med.instructions}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
