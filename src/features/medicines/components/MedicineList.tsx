"use client";

import type { Medicine } from "../types/medicine.types";
import { MedicineCard } from "./MedicineCard";

export function MedicineList({ medicines }: { medicines: Medicine[] }) {
  if (!medicines || medicines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
        No active medicines registered yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
}
