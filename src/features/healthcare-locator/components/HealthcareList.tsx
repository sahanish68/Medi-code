"use client";

import { useState } from "react";
import { Filter, Building2, Pill, Hospital, ShieldCheck } from "lucide-react";
import type { HealthcareFacility } from "@/types/healthcare";
import { HealthcareCard } from "./HealthcareCard";

interface HealthcareListProps {
  facilities: HealthcareFacility[];
  selectedId?: string;
  onSelectFacility?: (id: string) => void;
}

export function HealthcareList({ facilities, selectedId, onSelectFacility }: HealthcareListProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOwnership, setFilterOwnership] = useState<string>("all");

  const filtered = facilities.filter((f) => {
    if (filterType !== "all" && f.facilityType !== filterType) return false;
    if (filterOwnership !== "all" && f.ownershipType !== filterOwnership) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Filter size={15} /> Filter Facilities:
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Facility Type Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs">
            <button
              onClick={() => setFilterType("all")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                filterType === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("pharmacy")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
                filterType === "pharmacy" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Pill size={12} /> Pharmacy
            </button>
            <button
              onClick={() => setFilterType("hospital")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
                filterType === "hospital" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hospital size={12} /> Hospital
            </button>
            <button
              onClick={() => setFilterType("clinic")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
                filterType === "clinic" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 size={12} /> Clinic
            </button>
          </div>

          {/* Ownership Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs">
            <button
              onClick={() => setFilterOwnership("all")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                filterOwnership === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Owners
            </button>
            <button
              onClick={() => setFilterOwnership("government")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition ${
                filterOwnership === "government"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-700 hover:text-emerald-900"
              }`}
            >
              <ShieldCheck size={12} /> Govt
            </button>
            <button
              onClick={() => setFilterOwnership("private")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                filterOwnership === "private" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Private
            </button>
          </div>
        </div>
      </div>

      {/* Facilities List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
          <p className="font-semibold">No healthcare facilities match your criteria.</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your filters or search location.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((facility) => (
            <div
              key={facility.id}
              onClick={() => onSelectFacility?.(facility.id)}
              className={`cursor-pointer transition-all ${
                selectedId === facility.id ? "ring-2 ring-teal-600 rounded-2xl" : ""
              }`}
            >
              <HealthcareCard facility={facility} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
