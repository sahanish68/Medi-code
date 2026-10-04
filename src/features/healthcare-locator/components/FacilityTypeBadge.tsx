import { Building2, Hospital, Pill, ShieldCheck, Stethoscope } from "lucide-react";
import type { HealthcareFacility } from "@/types/healthcare";

export function FacilityTypeBadge({
  facilityType,
  ownershipType,
  isJanAushadhi
}: {
  facilityType: HealthcareFacility["facilityType"];
  ownershipType: HealthcareFacility["ownershipType"];
  isJanAushadhi?: boolean;
}) {
  const getFacilityIcon = () => {
    switch (facilityType) {
      case "pharmacy":
        return <Pill size={12} />;
      case "hospital":
        return <Hospital size={12} />;
      case "clinic":
        return <Stethoscope size={12} />;
      default:
        return <Building2 size={12} />;
    }
  };

  const isGov = ownershipType === "government" || isJanAushadhi;

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
      {/* Facility Type Badge */}
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700 capitalize">
        {getFacilityIcon()}
        {facilityType.replace("_", " ")}
      </span>

      {/* Government / Private Badge */}
      {isGov ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-800 border border-emerald-300 font-bold">
          <ShieldCheck size={12} />
          {isJanAushadhi ? "Govt Jan Aushadhi" : "Government"}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 border border-blue-200">
          Private
        </span>
      )}
    </div>
  );
}
