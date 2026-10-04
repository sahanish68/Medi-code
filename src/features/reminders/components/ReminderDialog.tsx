"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useReminderStore } from "../hooks/useReminderStore";
import { ReminderTimePicker } from "./ReminderTimePicker";

export function ReminderDialog() {
  const { selectedMedicine, closeReminder, addReminder } = useReminderStore();
  const [time, setTime] = useState("08:00 AM");

  if (!selectedMedicine) return null;

  const handleSave = () => {
    addReminder(selectedMedicine, time);
    closeReminder();
  };

  return (
    <Modal
      isOpen={Boolean(selectedMedicine)}
      title="Set Medicine Reminder"
      description={`Set a daily alert for ${selectedMedicine.name}`}
      onClose={closeReminder}
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="rounded-2xl bg-teal-50/70 p-4 text-xs text-teal-900 border border-teal-100">
          <div className="font-bold text-sm text-teal-950">{selectedMedicine.name}</div>
          <div className="mt-1 font-medium">
            {selectedMedicine.dosage || "1 dose"} • {selectedMedicine.frequency || "Daily"} • {selectedMedicine.timing || "After food"}
          </div>
        </div>

        <ReminderTimePicker value={time} onChange={setTime} />

        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" className="flex-1" onClick={closeReminder}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-bold"
            onClick={handleSave}
          >
            <Bell size={16} /> Save Reminder
          </Button>
        </div>
      </div>
    </Modal>
  );
}
