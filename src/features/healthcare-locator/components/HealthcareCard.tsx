import { Hospital, MapPin, Pill } from "lucide-react";
import type { HealthcareFacility } from "@/types/healthcare";
import { Button } from "@/components/ui/Button";

export function HealthcareCard({ facility }: { facility: HealthcareFacility }) {
  const icon = facility.facilityType === "pharmacy" ? <Pill size={19} /> : <Hospital size={19} />;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white">{facility.name}</h3>
            <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
              {facility.ownershipType}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <MapPin size={14} /> {facility.distance} · {facility.address}
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + " " + facility.address)}`,
            "_blank"
          )}
        >
          Directions
        </Button>
      </div>
    </div>
  );
}
