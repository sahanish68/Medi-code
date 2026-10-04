import { Clock, Calendar, CheckSquare, Compass } from "lucide-react";
import type { Medicine } from "../types/medicine.types";

export function DosageDisplay({ medicine }: { medicine: Medicine }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-teal-100 text-teal-800">
          <CheckSquare size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">Dosage</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{medicine.dosage}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 text-sky-800">
          <Clock size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">Frequency</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{medicine.frequency}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-800">
          <Compass size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">Meal Timing</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{medicine.timing}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 text-purple-800">
          <Calendar size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">Duration</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{medicine.duration}</div>
        </div>
      </div>
    </div>
  );
}
