"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PrescriptionsPage } from "@/features/prescriptions/components/PrescriptionsPage";
import { MedicationSchedule } from "@/features/medication-schedule/components/MedicationSchedule";

export default function PrescriptionsRoutePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PrescriptionsPage />
        <MedicationSchedule />
      </div>
    </AppShell>
  );
}
