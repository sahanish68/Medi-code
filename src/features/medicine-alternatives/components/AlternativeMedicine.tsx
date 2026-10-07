"use client";

import { useMemo } from "react";
import { Sparkles, Pill } from "lucide-react";
import type { Medicine } from "@/features/medicines/types/medicine.types";
import { findMedicineAlternatives } from "../services/alternativeMedicineService";
import { AlternativeList } from "./AlternativeList";
import { AlternativeWarning } from "./AlternativeWarning";

export function AlternativeMedicine({ medicine }: { medicine: Medicine }) {
  const alternatives = useMemo(() => {
    return findMedicineAlternatives(medicine.name, medicine.id);
  }, [medicine.name, medicine.id]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
          <Pill size={16} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Possible Generic Equivalents</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Same active salt composition and strength (e.g. PMBJP Jan Aushadhi)
          </p>
        </div>
      </div>

      <AlternativeWarning />

      <AlternativeList alternatives={alternatives} />
    </div>
  );
}
