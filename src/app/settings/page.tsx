"use client";

import { AppShell } from "@/components/layout/AppShell";
import { SettingsPage } from "@/features/settings/components/SettingsPage";

export default function SettingsRoutePage() {
  return (
    <AppShell>
      <SettingsPage />
    </AppShell>
  );
}
