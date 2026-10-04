"use client";

import { useState } from "react";
import { Pill, Search, ShieldCheck } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { MedicineCard } from "./MedicineCard";
import { MedicineDetails } from "./MedicineDetails";

export function MedicinesPage() {
  const { prescriptions, openUpload } = usePrescriptionStore();
  const [search, setSearch] = useState("");

  // Gather medicines from all user's prescriptions
  const allMedicines = prescriptions.flatMap((p) => p.medicines || []);

  const filtered = allMedicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.ingredients.some((ing) => ing.toLowerCase().includes(search.toLowerCase())) ||
    m.uses.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Prescribed Medicines"
          description="Understand active composition, dosage schedules, side effects, and precautions."
          icon={Pill}
        />

        {allMedicines.length > 0 && (
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicines or salts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <EmptyState
          text={
            allMedicines.length === 0
              ? "No medicines found. Upload a prescription to extract medicines."
              : "No medicines matching your search."
          }
          icon={Pill}
          actionLabel={allMedicines.length === 0 ? "Upload Prescription" : undefined}
          onAction={allMedicines.length === 0 ? openUpload : undefined}
        />
      )}

      {/* Persistent safety notice */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-950">
        <ShieldCheck size={18} className="text-amber-700 shrink-0" />
        <span>
          <strong>Medical Guidance:</strong> Always take prescribed medicines exactly as directed by your doctor. Do not adjust dosage or stop a course without consulting a physician.
        </span>
      </div>

      <MedicineDetails />
    </div>
  );
}
