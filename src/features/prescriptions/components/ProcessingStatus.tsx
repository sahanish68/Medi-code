"use client";

import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";
import { MedicalAICore } from "@/components/3d/MedicalAICore";
import type { ProcessingStep } from "../hooks/usePrescriptionStore";

interface ProcessingStatusProps {
  currentStep: ProcessingStep;
}

export function ProcessingStatus({ currentStep }: ProcessingStatusProps) {
  const steps: { key: ProcessingStep; label: string; desc: string }[] = [
    { key: "uploading", label: "Uploading prescription...", desc: "Securely transmitting to encrypted vault" },
    { key: "reading", label: "Reading doctor handwriting...", desc: "Neural OCR scanning medical text & layout" },
    { key: "identifying", label: "Identifying medicines...", desc: "Extracting dosage, strength, and frequencies" },
    { key: "generating", label: "Validating clinical guidelines...", desc: "Building plain-language timings & safety checks" }
  ];

  const stepOrder: ProcessingStep[] = ["uploading", "reading", "identifying", "generating", "completed"];
  const currentIndex = stepOrder.indexOf(currentStep);

  const percentage = Math.min(100, Math.max(15, (currentIndex + 1) * 25));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-cyan-500/30 bg-white/90 dark:bg-slate-950/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Header Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/50 px-3.5 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-300">
          <Sparkles size={14} className="animate-spin-slow text-cyan-600 dark:text-cyan-400" />
          CLINICAL NEURAL AI ENGINE AT WORK
        </div>
        <h3 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
          Decoding & Validating Prescription
        </h3>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
          Our deep-learning clinical OCR model is standardizing handwritten dosages.
        </p>
      </div>

      {/* Center 3D Holographic AI Sphere & Radial Progress */}
      <div className="relative my-6 flex flex-col items-center justify-center">
        <div className="relative h-64 w-64 flex items-center justify-center">
          {/* Circular Progress Ring Overlay */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-cyan-500 dark:stroke-cyan-400 transition-all duration-500 ease-out"
              strokeWidth="3.5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * percentage) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* 3D WebGL Processing Sphere Core */}
          <MedicalAICore isProcessing mode="processing" size={240} className="z-10" />

          {/* Centered Percentage Overlay */}
          <div className="pointer-events-none absolute bottom-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-cyan-400/40 px-3 py-0.5 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 backdrop-blur-md z-20 shadow-xs">
            {percentage}% ANALYZED
          </div>
        </div>
      </div>

      {/* Live Progress Checklist Panel */}
      <div className="mx-auto max-w-lg space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 backdrop-blur-xl">
        {steps.map((s, idx) => {
          const isDone = currentIndex > idx;
          const isCurrent = currentStep === s.key;

          return (
            <div
              key={s.key}
              className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors ${
                isCurrent ? "bg-cyan-100/70 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30" : ""
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-xs font-bold ${
                    isCurrent ? "text-cyan-900 dark:text-cyan-300" : isDone ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">{s.desc}</div>
              </div>
              {isDone && (
                <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                  DONE
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
