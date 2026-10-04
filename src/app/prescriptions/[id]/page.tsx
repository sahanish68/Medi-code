"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PrescriptionResult } from "@/features/prescriptions/components/PrescriptionResult";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrescriptionDetailRoutePage() {
  const { prescription } = usePrescriptionStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <Link href="/prescriptions">
          <Button variant="secondary" size="sm" className="mb-2">
            <ArrowLeft size={16} /> Back to Prescriptions
          </Button>
        </Link>
        {prescription ? (
          <PrescriptionResult prescription={prescription} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
            No active prescription found. Please upload or select a prescription.
          </div>
        )}
      </div>
    </AppShell>
  );
}
