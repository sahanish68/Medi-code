"use client";

import { Hospital, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";

export function NearbyHealthcare() {
  const { setActiveTab } = useAppStore();

  return (
    <Card hoverEffect className="border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-base">
            <Hospital size={18} className="text-cyan-700 dark:text-cyan-400" /> Nearby Healthcare & Pharmacies
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

        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4">
          <div className="flex items-start gap-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30">
              <MapPin size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Jan Aushadhi & Hospitals</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 px-2 py-0.5 text-[10px] font-extrabold text-emerald-900 dark:text-emerald-300">
                  <ShieldCheck size={11} /> PMBJK Verified
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                Locate generic medicine pharmacies (Jan Aushadhi Kendras), civil hospitals, and 24/7 chemists near your location.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setActiveTab("healthcare")}
        variant="glow"
        className="mt-4 w-full text-xs shadow-sm"
      >
        <MapPin size={15} /> Open Healthcare Locator Map
      </Button>
    </Card>
  );
}
