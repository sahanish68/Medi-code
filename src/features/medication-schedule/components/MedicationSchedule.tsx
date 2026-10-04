"use client";

import { useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";
import { generateSchedulesForMedicines } from "../services/scheduleGenerator";
import { ScheduleCard } from "./ScheduleCard";
import { EditScheduleDialog } from "./EditScheduleDialog";
import { DoseTimeline } from "./DoseTimeline";
import type { MedicationSchedule as ScheduleType } from "../types/schedule.types";

export function MedicationSchedule() {
  const { prescription } = usePrescriptionStore();
  const [editingSchedule, setEditingSchedule] = useState<ScheduleType | null>(null);

  if (!prescription || !prescription.medicines || prescription.medicines.length === 0) {
    return null;
  }

  const { schedules, timeline } = generateSchedulesForMedicines(prescription.medicines);

  const activeEditingMedicineName = editingSchedule
    ? prescription.medicines.find((m) => m.id === editingSchedule.medicineId)?.name || "Medicine"
    : "";

  return (
    <Card className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
            <CalendarDays size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Medication Schedule</h3>
            <p className="text-xs text-slate-500">
              Personalized timing based on doctor&apos;s frequency and meal instructions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock3 size={15} className="text-teal-600" />
          <span>Timeline auto-synchronized</span>
        </div>
      </div>

      {/* Dose Timeline */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Today&apos;s Scheduled Doses
        </h4>
        <DoseTimeline doses={timeline} />
      </div>

      {/* Editable Medicine Schedule Cards */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Active Medicine Regimens ({schedules.length})
        </h4>
        <div className="space-y-3">
          {schedules.map((schedule) => {
            const med = prescription.medicines.find((m) => m.id === schedule.medicineId);
            return (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                medicineName={med ? `${med.name} ${med.strength}` : "Prescribed Medicine"}
                onEdit={(s) => setEditingSchedule(s)}
              />
            );
          })}
        </div>
      </div>

      {editingSchedule && (
        <EditScheduleDialog
          isOpen={Boolean(editingSchedule)}
          schedule={editingSchedule}
          medicineName={activeEditingMedicineName}
          onClose={() => setEditingSchedule(null)}
          onSave={(updated) => {
            // Updated in UI
            setEditingSchedule(null);
          }}
        />
      )}
    </Card>
  );
}
