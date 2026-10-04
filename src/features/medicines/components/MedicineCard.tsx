"use client";

import { Bell, Pill } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Medicine } from "@/types/medicine";
import { useMedicineStore } from "../hooks/useMedicineStore";
import { useReminderStore } from "@/features/reminders/hooks/useReminderStore";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const { openMedicine } = useMedicineStore();
  const { openReminder } = useReminderStore();

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
          <Pill size={20} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{medicine.name}</h3>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">
              {medicine.confidence}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{medicine.strength} · {medicine.dosage}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info label="Frequency" value={medicine.frequency} />
        <Info label="Duration" value={medicine.duration} />
        <Info label="Timing" value={medicine.timing} />
        <Info label="Route" value={medicine.route} />
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => openMedicine(medicine)}>
          View details
        </Button>
        <Button onClick={() => openReminder(medicine)}>
          <Bell size={16} /> Reminder
        </Button>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
