"use client";

import { useState } from "react";
import { Pill, Search, ShieldCheck, Sparkles } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { MedicineCard } from "./MedicineCard";
import { MedicineDetails } from "./MedicineDetails";

export function MedicinesPage() {
  const { prescriptions, openUpload } = usePrescriptionStore();
  const [search, setSearch] = useState("");

  const allMedicines = prescriptions.flatMap((p) => p.medicines || []);

  const filtered = allMedicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.ingredients.some((ing) => ing.toLowerCase().includes(search.toLowerCase())) ||
    m.uses.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Prescribed Medicines Catalogue"
          description="Understand active composition, dosage schedules, side effects, and clinical precautions."
          icon={Pill}
        />

        {allMedicines.length > 0 && (
          <div className="relative sm:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <input
              type="text"
              placeholder="Search medicines or active salts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none backdrop-blur-md"
            />
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <EmptyState
          text={
            allMedicines.length === 0
              ? "No active medicines found. Upload a prescription to extract structured medicine details."
              : "No medicines matching your search criteria."
          }
          icon={Pill}
          actionLabel={allMedicines.length === 0 ? "Upload Prescription" : undefined}
          onAction={allMedicines.length === 0 ? openUpload : undefined}
        />
      )}

      {/* Persistent safety notice */}
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 p-4 text-xs text-amber-900 dark:text-amber-200 backdrop-blur-md">
        <ShieldCheck size={20} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <span>
          <strong className="text-amber-800 dark:text-amber-300">Medical Advice:</strong> Always take prescribed medicines exactly as directed by your physician. Do not alter dosage without consulting a qualified healthcare professional.
        </span>
      </div>

      <MedicineDetails />
    </div>
  );
}
