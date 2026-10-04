"use client";

import { AppShell } from "@/components/layout/AppShell";
import { MedicinesPage } from "@/features/medicines/components/MedicinesPage";

export default function MedicineDetailRoutePage() {
  return (
    <AppShell>
      <MedicinesPage />
    </AppShell>
  );
}
