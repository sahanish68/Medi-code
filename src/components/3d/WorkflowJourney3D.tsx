"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, FileSearch, ShieldCheck, CheckCircle2, Pill, Sparkles, ChevronRight } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    id: 1,
    badge: "STEP 01",
    title: "Upload Prescription",
    subtitle: "Drag & drop printed or handwritten doctor prescriptions or medicine images.",
    icon: Upload
  },
  {
    id: 2,
    badge: "STEP 02",
    title: "AI Holographic Scan",
    subtitle: "Neural OCR engine scans document layout, identifying handwritten doctor notes.",
    icon: Scan
  },
  {
    id: 3,
    badge: "STEP 03",
    title: "Entity Extraction",
    subtitle: "Extracts medicine names, strength, dosage frequencies, and duration.",
    icon: FileSearch
  },
  {
    id: 4,
    badge: "STEP 04",
    title: "Clinical AI Validation",
    subtitle: "Matches extracted entities against verified pharmaceutical database.",
    icon: ShieldCheck
  },
  {
    id: 5,
    badge: "STEP 05",
    title: "Intelligent Dashboard",
    subtitle: "Clear dosage schedule, safety warnings, and optional alarm reminders.",
    icon: CheckCircle2
  }
];

export function WorkflowJourney3D() {
  const [activeStep, setActiveStep] = useState(1);

  const currentStep = WORKFLOW_STEPS.find((s) => s.id === activeStep) || WORKFLOW_STEPS[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 p-6 sm:p-10 backdrop-blur-2xl shadow-xl transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 px-3.5 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-300">
          <Sparkles size={14} className="animate-spin-slow text-cyan-600 dark:text-cyan-400" />
          3D INTERACTIVE WORKFLOW
        </div>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl text-slate-900 dark:text-white">
          How MediDecode AI Works
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Trace the continuous end-to-end medical extraction journey from raw prescription scan to clinical validation.
        </p>
      </div>

      {/* Step Tabs Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {WORKFLOW_STEPS.map((step) => {
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white dark:text-slate-950 shadow-md scale-105"
                  : "bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-cyan-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <div className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-bold ${isActive ? "bg-white text-cyan-700 dark:bg-slate-950 dark:text-cyan-300" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                0{step.id}
              </div>
              <span className="hidden md:inline">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12 items-center min-h-[380px]">
        {/* Left Explanation Card */}
        <div className="lg:col-span-5 space-y-4">
          <span className="inline-block rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-400">
            {currentStep.badge}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{currentStep.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {currentStep.subtitle}
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 disabled:opacity-40 hover:text-slate-900 dark:hover:text-white transition"
            >
              Previous
            </button>

            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Step {activeStep} of 5
            </span>

            <button
              disabled={activeStep === 5}
              onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-600 dark:hover:bg-cyan-400 disabled:opacity-40 transition flex items-center gap-1 shadow-sm"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right 3D Visual Sandbox Stage */}
        <div className="lg:col-span-7 relative h-80 rounded-2xl border border-slate-200/90 dark:border-cyan-500/20 bg-slate-50/80 dark:bg-slate-900/60 p-6 backdrop-blur-xl overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="flex flex-col items-center justify-center text-center p-6 space-y-4"
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur group-hover:opacity-70 transition duration-500" />
                  <div className="relative flex h-36 w-64 flex-col items-center justify-center rounded-2xl border border-cyan-400/40 bg-white dark:bg-slate-950 p-4 text-cyan-600 dark:text-cyan-400 shadow-xl">
                    <Upload size={36} className="animate-bounce text-cyan-600 dark:text-cyan-400" />
                    <p className="mt-2 text-xs font-bold tracking-wide text-slate-800 dark:text-cyan-200">
                      Prescription_Rx_091.jpg
                    </p>
                    <span className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      Drag & Drop or Click to Upload
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <div className="relative h-60 w-80 rounded-xl border border-cyan-500/30 bg-white dark:bg-slate-950 p-5 shadow-2xl overflow-hidden font-mono text-xs">
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#0284c7]"
                  />
                  <div className="flex justify-between text-slate-500 text-[10px] border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span>NEURAL OCR ENGINE</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">SCANNING 89%</span>
                  </div>
                  <div className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
                    <p className="bg-cyan-50 dark:bg-slate-900 p-1.5 rounded border border-cyan-300 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold">
                      Rx: Dr. Sharma, MD
                    </p>
                    <p className="line-through text-slate-400">Tab. Azithromycin 500mg - 1 OD x 5d</p>
                    <p className="line-through text-slate-400">Tab. PCM 650mg - 1 BD pc</p>
                    <p className="text-amber-600 dark:text-amber-400 text-[11px] font-bold">⚡ Detecting handwritten entities...</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid gap-3 sm:grid-cols-2 w-full max-w-lg"
              >
                <div className="rounded-xl border border-cyan-300 dark:border-cyan-500/30 bg-white dark:bg-slate-950 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Azithromycin</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <div>Strength: <span className="text-cyan-600 dark:text-cyan-400 font-bold">500 mg</span></div>
                    <div>Frequency: <span className="text-slate-800 dark:text-slate-200 font-bold">Once Daily (OD)</span></div>
                  </div>
                </div>

                <div className="rounded-xl border border-teal-300 dark:border-teal-500/30 bg-white dark:bg-slate-950 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-teal-600 dark:text-teal-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Paracetamol (PCM)</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <div>Strength: <span className="text-teal-600 dark:text-teal-400 font-bold">650 mg</span></div>
                    <div>Frequency: <span className="text-slate-800 dark:text-slate-200 font-bold">Twice Daily (BD)</span></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center space-y-4 text-center"
              >
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-2 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-2 flex items-center justify-center shadow-lg">
                    <ShieldCheck size={48} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 px-3 py-1 rounded-full">
                    <CheckCircle2 size={14} /> Clinical Database Match 98%
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Pharmacological safety bounds verified against standard medical guidelines.
                  </p>
                </div>
              </motion.div>
            )}

            {activeStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md rounded-2xl border border-cyan-400/40 bg-white dark:bg-slate-950 p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Prescription Ready</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">STATUS: DECODED</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Azithromycin 500mg</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">1 Tablet after breakfast for 5 days</p>
                  </div>
                  <span className="rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] px-2 py-0.5 font-bold">
                    VERIFIED
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
