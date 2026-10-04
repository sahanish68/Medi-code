"use client";

import { AppShell } from "@/components/layout/AppShell";
import { RemindersPage } from "@/features/reminders/components/RemindersPage";

export default function RemindersRoutePage() {
  return (
    <AppShell>
      <RemindersPage />
    </AppShell>
  );
}
