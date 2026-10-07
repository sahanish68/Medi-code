"use client";

import { useState } from "react";
import { HeartPulse, Smile, TrendingUp, AlertTriangle, Stethoscope, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function PatientHealthHeading() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>("better");
  const [logSaved, setLogSaved] = useState(false);

  const options = [
    {
      id: "great",
      label: "Feeling Great",
      desc: "Full energy, no symptoms",
      icon: Smile,
      color: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300",
      activeBg: "bg-emerald-600 text-white border-emerald-600"
    },
    {
      id: "better",
      label: "Recovering & Better",
      desc: "Mild fatigue, improving",
      icon: TrendingUp,
      color: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300",
      activeBg: "bg-cyan-600 text-white border-cyan-600"
    },
    {
      id: "symptoms",
      label: "Mild Symptoms",
      desc: "Headache, nausea, or discomfort",
      icon: AlertTriangle,
      color: "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300",
      activeBg: "bg-amber-600 text-white border-amber-600"
    },
    {
      id: "help",
      label: "Need Assistance",
      desc: "Consult treating physician",
      icon: Stethoscope,
      color: "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300",
      activeBg: "bg-rose-600 text-white border-rose-600"
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedFeeling(id);
    setLogSaved(true);
    setTimeout(() => setLogSaved(false), 3000);
  };

  return (
    <Card className="relative overflow-hidden border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 dark:from-slate-950 dark:via-slate-950 dark:to-cyan-950 text-white p-6 sm:p-8 shadow-xl">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            <HeartPulse size={15} className="animate-pulse text-cyan-400" />
            DAILY PATIENT HEALTH STATUS CHECK-IN
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How are you heading today?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Track your daily recovery, report side-effects, and sync health logs with your personalized AI clinical schedule.
          </p>
        </div>

        {/* Adherence Streak Badge */}
        <div className="flex items-center gap-3 shrink-0 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 px-4 py-2.5 backdrop-blur-md">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
            🔥
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Medication Adherence</div>
            <div className="text-sm font-extrabold text-white">5-Day 100% Streak</div>
          </div>
        </div>
      </div>

      {/* Interactive Status Selector */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedFeeling === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              type="button"
              className={`flex flex-col items-start gap-2 rounded-2xl p-3.5 border transition-all cursor-pointer text-left ${
                isSelected ? opt.activeBg + " shadow-lg scale-[1.02]" : opt.color + " hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon size={20} />
                {isSelected && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <div>
                <div className="text-xs font-bold">{opt.label}</div>
                <div className={`text-[10px] ${isSelected ? "text-white/80" : "opacity-80"}`}>
                  {opt.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {logSaved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 p-3 text-xs text-emerald-300 font-semibold animate-in fade-in duration-200">
          <ShieldCheck size={16} />
          <span>Health status recorded successfully! Schedule adjustments & warnings auto-updated.</span>
        </div>
      )}
    </Card>
  );
}
