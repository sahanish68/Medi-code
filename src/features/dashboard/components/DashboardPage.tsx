"use client";

import { Bell, FileText, HeartPulse, Pill, Upload, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MedicalAICore } from "@/components/3d/MedicalAICore";
import { WorkflowJourney3D } from "@/components/3d/WorkflowJourney3D";
import { SecurityVault3D } from "@/components/3d/SecurityVault3D";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { useReminders } from "@/features/reminders/hooks/useReminders";
import { PatientHealthHeading } from "./PatientHealthHeading";
import { UpcomingScheduleWidget } from "./UpcomingScheduleWidget";
import { PrescriptionUpload } from "./PrescriptionUpload";
import { RecentPrescriptions } from "./RecentPrescriptions";
import { NearbyHealthcare } from "./NearbyHealthcare";

export function DashboardPage() {
  const { prescription, openUpload } = usePrescriptionStore();
  const { reminders } = useReminders();

  const activeMedicinesCount = prescription?.medicines.length ?? 0;
  const activeRemindersCount = reminders.filter((r) => r.enabled).length;

  const scrollToWorkflow = () => {
    const el = document.getElementById("workflow-journey-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. PATIENT HEALTH CHECK-IN: "How are you heading today?" */}
      <PatientHealthHeading />

      {/* 2. UPCOMING SCHEDULES HERO TIMELINE */}
      <UpcomingScheduleWidget />

      {/* 3. CINEMATIC 3D AI HERO & SCAN LAUNCHER */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 dark:from-slate-950 dark:via-slate-950 dark:to-cyan-950 p-6 sm:p-10 lg:p-12 shadow-xl dark:shadow-[0_0_50px_rgba(6,182,212,0.12)] backdrop-blur-2xl text-white">
        {/* Background Ambient Lighting */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3.5 py-1 text-xs font-extrabold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Sparkles size={14} className="text-cyan-400 animate-spin-slow" />
              AI MEDICAL SCANNER & CLINICAL ENGINE
            </div>

            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-gradient-cyan">
              Instant Prescription Decoding <br />
              <span className="text-gradient-teal">& Safety Verification.</span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              Upload paper prescriptions or doctor notes to extract structured dosages, active salt compositions, and Jan Aushadhi generic alternatives automatically.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="glow"
                size="lg"
                onClick={openUpload}
                className="group shadow-[0_0_35px_rgba(6,182,212,0.4)]"
              >
                <Upload size={18} /> Upload Prescription
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToWorkflow}
              >
                Explore How It Works
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck size={16} className="text-cyan-400" /> AES-256 Encrypted Buffer
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <HeartPulse size={16} className="text-emerald-400" /> 98.4% OCR Confidence
              </span>
            </div>
          </div>

          {/* Right Interactive 3D Medical Core Object */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px]">
            <MedicalAICore mode="hero" size={340} className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* 4. QUICK STATISTICS BAR */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Prescriptions" value={prescription ? 1 : 0} icon={FileText} color="cyan" />
        <Stat label="Active Medicines" value={activeMedicinesCount} icon={Pill} color="teal" />
        <Stat label="Today's Doses" value={activeMedicinesCount ? activeMedicinesCount * 2 : 0} icon={HeartPulse} color="blue" />
        <Stat label="Upcoming Reminders" value={activeRemindersCount} icon={Bell} color="emerald" />
      </div>

      {/* 5. MODULAR DASHBOARD COMPONENTS */}
      <div className="grid gap-8 lg:grid-cols-2">
        <PrescriptionUpload />
        <NearbyHealthcare />
      </div>

      <div className="grid gap-8 lg:grid-cols-1">
        <RecentPrescriptions />
      </div>

      {/* 6. 3D STEP-BY-STEP WORKFLOW JOURNEY */}
      <div id="workflow-journey-section">
        <WorkflowJourney3D />
      </div>

      {/* 7. 3D SECURITY DATA VAULT */}
      <SecurityVault3D />
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  color = "cyan"
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color?: "cyan" | "teal" | "blue" | "emerald";
}) {
  const colorMap = {
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
  };

  return (
    <Card hoverEffect className="group">
      <div className="flex items-center justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl border ${colorMap[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} />
        </div>
        <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{value}</div>
      </div>
      <div className="mt-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
    </Card>
  );
}
