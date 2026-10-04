"use client";

import { AlertTriangle, Bell, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useMedicineStore } from "../hooks/useMedicineStore";
import { useReminderStore } from "@/features/reminders/hooks/useReminderStore";
import { DosageDisplay } from "./DosageDisplay";
import { UsesSection } from "./UsesSection";
import { IngredientsSection } from "./IngredientsSection";
import { SideEffectsSection } from "./SideEffectsSection";
import { SafetyWarnings } from "./SafetyWarnings";
import { AlternativeMedicine } from "@/features/medicine-alternatives/components/AlternativeMedicine";
import type { Medicine } from "../types/medicine.types";

export function MedicineDetails({ medicine: propMedicine }: { medicine?: Medicine }) {
  const { selectedMedicine, closeMedicine } = useMedicineStore();
  const { openReminder } = useReminderStore();

  const med = propMedicine || selectedMedicine;
  if (!med) return null;

  return (
    <Modal
      isOpen={Boolean(med)}
      onClose={closeMedicine}
      title={med.name}
      description={med.strength ? `Strength: ${med.strength} • Route: ${med.route}` : `Route: ${med.route}`}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Verification banner if needed */}
        {med.needsVerification ? (
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 font-medium">
            <AlertTriangle size={16} className="text-amber-700 shrink-0" />
            <span>
              Doctor&apos;s handwriting was partially unclear. Verify exact strength, dosage, and duration with your pharmacist or doctor before taking.
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Badge variant="success">
              <CheckCircle2 size={13} /> High Confidence Extraction
            </Badge>
            <span className="text-xs text-slate-400">Score: {Math.round((med.confidenceScore || 0.9) * 100)}%</span>
          </div>
        )}

        {/* 1. Dosage grid */}
        <DosageDisplay medicine={med} />

        {/* 2. Uses in simple language */}
        <UsesSection uses={med.uses} />

        {/* 3. Ingredients / Active Composition */}
        <IngredientsSection ingredients={med.ingredients} strength={med.strength} />

        {/* 4. Side Effects (Common vs Serious) */}
        <SideEffectsSection sideEffects={med.sideEffects} seriousWarnings={med.seriousWarnings} />

        {/* 5. Safety Warnings & Allergies */}
        <SafetyWarnings warnings={med.warnings} />

        {/* 6. Generic Equivalents / Alternatives */}
        <div className="border-t border-slate-100 pt-4">
          <AlternativeMedicine medicine={med} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" className="flex-1" onClick={closeMedicine}>
            Close
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              closeMedicine();
              openReminder(med);
            }}
          >
            <Bell size={16} /> Set Medicine Reminder
          </Button>
        </div>
      </div>
    </Modal>
  );
}
