"use client";

import { Bell, FileText, HeartPulse, Pill, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { useReminders } from "@/features/reminders/hooks/useReminders";
import { PrescriptionUpload } from "./PrescriptionUpload";
import { RecentPrescriptions } from "./RecentPrescriptions";
import { TodayMedicationSchedule } from "./TodayMedicationSchedule";
import { UpcomingReminders } from "./UpcomingReminders";
import { NearbyHealthcare } from "./NearbyHealthcare";

export function DashboardPage() {
  const { prescription, openUpload } = usePrescriptionStore();
  const { reminders } = useReminders();

  const activeMedicinesCount = prescription?.medicines.length ?? 0;
  const activeRemindersCount = reminders.filter((r) => r.enabled).length;

  return (
    <div className="space-y-6">
      {/* Banner / Hero section */}
      <section className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-800 p-6 text-white shadow-md sm:p-8">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <HeartPulse size={14} /> AI-powered regional prescription decoder
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
            Understand your prescription in simple terms.
          </h1>
          <p className="mt-3 text-sm leading-6 text-teal-50 sm:text-base">
            Upload printed or handwritten doctor prescriptions to convert complex medical jargon into clear dosage schedules, safety advice, and regional guidance.
          </p>
          <Button
            className="mt-6 bg-white text-teal-800 font-bold hover:bg-teal-50 shadow-sm"
            onClick={openUpload}
          >
            <Upload size={18} /> Decode Prescription Now
          </Button>
        </div>
      </section>

      {/* Quick Statistics Bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Prescriptions" value={prescription ? 1 : 0} icon={FileText} />
        <Stat label="Active Medicines" value={activeMedicinesCount} icon={Pill} />
        <Stat label="Today's Doses" value={activeMedicinesCount ? activeMedicinesCount * 2 : 0} icon={HeartPulse} />
        <Stat label="Upcoming Reminders" value={activeRemindersCount} icon={Bell} />
      </div>

      {/* Modular Independent Dashboard Components */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PrescriptionUpload />
        <NearbyHealthcare />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPrescriptions />
        <TodayMedicationSchedule />
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <UpcomingReminders />
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
          <Icon size={19} />
        </div>
        <div className="text-2xl font-extrabold text-slate-800">{value}</div>
      </div>
      <div className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
    </Card>
  );
}
