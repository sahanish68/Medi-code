"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { MedicationSchedule } from "../types/schedule.types";

interface EditScheduleDialogProps {
  schedule: MedicationSchedule | null;
  medicineName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSchedule: MedicationSchedule) => void;
}

export function EditScheduleDialog({
  schedule,
  medicineName = "Medicine",
  isOpen,
  onClose,
  onSave
}: EditScheduleDialogProps) {
  const [times, setTimes] = useState<string[]>(schedule?.times || ["08:00 AM"]);
  const [foodInstruction, setFoodInstruction] = useState(schedule?.foodInstruction || "After food");

  if (!schedule) return null;

  const handleTimeChange = (index: number, val: string) => {
    const updated = [...times];
    updated[index] = val;
    setTimes(updated);
  };

  const handleAddDoseTime = () => {
    setTimes([...times, "12:00 PM"]);
  };

  const handleRemoveDoseTime = (index: number) => {
    if (times.length <= 1) return;
    setTimes(times.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      ...schedule,
      times,
      foodInstruction
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Schedule: ${medicineName}`}
      description="Adjust your dose timings and meal instructions to fit your daily routine."
      maxWidth="md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Daily Dose Times
          </label>
          <div className="space-y-2">
            {times.map((t, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={t}
                  onChange={(e) => handleTimeChange(idx, e.target.value)}
                  placeholder="e.g. 08:00 AM"
                  className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium focus:border-teal-500 focus:outline-none"
                />
                {times.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDoseTime(idx)}
                    className="text-rose-600 hover:bg-rose-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddDoseTime}
            className="mt-3"
          >
            + Add Another Dose Time
          </Button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Meal Instruction
          </label>
          <select
            value={foodInstruction}
            onChange={(e) => setFoodInstruction(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium focus:border-teal-500 focus:outline-none"
          >
            <option value="After food">After food (Post meal)</option>
            <option value="Before food">Before food (Empty stomach)</option>
            <option value="With food">With food</option>
            <option value="At bedtime">At bedtime</option>
            <option value="As needed">As needed (SOS)</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
