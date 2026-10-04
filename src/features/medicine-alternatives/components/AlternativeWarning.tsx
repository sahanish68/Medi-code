import { ShieldAlert } from "lucide-react";

export function AlternativeWarning() {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs text-amber-950">
      <div className="flex items-start gap-2.5">
        <ShieldAlert size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-900 block mb-0.5">
            Professional Verification Required
          </strong>
          Possible equivalents are identified based on identical active salt composition and strength.
          <strong> Confirm with your doctor or pharmacist before using an alternative.</strong> Never substitute your prescribed medicine without professional confirmation.
        </div>
      </div>
    </div>
  );
}
