"use client";

import { AppShell } from "@/components/layout/AppShell";
import { HealthcarePage } from "@/features/healthcare-locator/components/HealthcarePage";

export default function HealthcareRoutePage() {
  return (
    <AppShell>
      <HealthcarePage />
    </AppShell>
  );
}
