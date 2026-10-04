"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/features/dashboard/components/DashboardPage";

export default function DashboardRoutePage() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
