"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { ProcessingStep } from "../hooks/usePrescriptionStore";

interface ProcessingStatusProps {
  currentStep: ProcessingStep;
}

export function ProcessingStatus({ currentStep }: ProcessingStatusProps) {
  const steps: { key: ProcessingStep; label: string; desc: string }[] = [
    { key: "uploading", label: "Uploading prescription...", desc: "Securely transmitting to encrypted storage" },
    { key: "reading", label: "Reading prescription...", desc: "Scanning handwriting and text with vision OCR" },
    { key: "identifying", label: "Identifying medicines...", desc: "Extracting dosage, strength, and frequencies" },
    { key: "generating", label: "Generating schedule...", desc: "Building plain-language timings and reminders" }
  ];

  const stepOrder: ProcessingStep[] = ["uploading", "reading", "identifying", "generating", "completed"];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="rounded-3xl border border-teal-100 bg-teal-50/50 p-6 shadow-xs">
      <div className="mb-4 text-center">
        <h4 className="text-base font-bold text-teal-900">Decoding Your Prescription</h4>
        <p className="text-xs text-teal-700">Please wait while our clinical AI extracts and verifies your medicine details.</p>
      </div>

      <div className="space-y-4">
        {steps.map((s, idx) => {
          const isDone = currentIndex > idx;
          const isCurrent = currentStep === s.key;

          return (
            <div key={s.key} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300" />
                )}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${isCurrent ? "text-teal-900 font-bold" : isDone ? "text-slate-800" : "text-slate-400"}`}>
                  {s.label}
                </div>
                <div className="text-xs text-slate-500">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
