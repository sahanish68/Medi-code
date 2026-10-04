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
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-teal-50 text-teal-700">
          <Pill size={16} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Possible Generic Equivalents</h4>
          <p className="text-[11px] text-slate-500">
            Same active salt composition and strength (e.g. PMBJP Jan Aushadhi)
          </p>
        </div>
      </div>

      <AlternativeWarning />

      <AlternativeList alternatives={alternatives} />
    </div>
  );
}
