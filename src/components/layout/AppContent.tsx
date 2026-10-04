"use client";

import { useAppStore } from "@/features/app/hooks/useAppStore";
import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { PrescriptionsPage } from "@/features/prescriptions/components/PrescriptionsPage";
import { MedicinesPage } from "@/features/medicines/components/MedicinesPage";
import { RemindersPage } from "@/features/reminders/components/RemindersPage";
import { HealthcarePage } from "@/features/healthcare-locator/components/HealthcarePage";
import { SettingsPage } from "@/features/settings/components/SettingsPage";
import { MedicationSchedule } from "@/features/medication-schedule/components/MedicationSchedule";

export function AppContent() {
  const { activeTab } = useAppStore();

  return (
    <>
      {activeTab === "dashboard" && <DashboardPage />}
      {activeTab === "prescriptions" && (
        <div className="space-y-6">
          <PrescriptionsPage />
          <MedicationSchedule />
        </div>
      )}
      {activeTab === "medicines" && <MedicinesPage />}
      {activeTab === "reminders" && <RemindersPage />}
      {activeTab === "healthcare" && <HealthcarePage />}
      {activeTab === "settings" && <SettingsPage />}
    </>
  );
}
