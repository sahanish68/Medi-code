"use client";

import { Hospital, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";

export function NearbyHealthcare() {
  const { setActiveTab } = useAppStore();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <Hospital size={18} className="text-teal-600" /> Nearby Healthcare & Pharmacies
        </h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveTab("healthcare")}
          className="text-xs"
        >
          Find Centers <ArrowRight size={14} />
        </Button>
      </div>

      <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-600 text-white">
            <MapPin size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">Government & Private Medical Facilities</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                <ShieldCheck size={10} /> Jan Aushadhi
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Locate high-quality generic medicine pharmacies (PMBJK), civil hospitals, and 24/7 chemists near your area.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setActiveTab("healthcare")}
          className="mt-4 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs"
        >
          Locate Pharmacies & Hospitals
        </Button>
      </div>
    </Card>
  );
}
