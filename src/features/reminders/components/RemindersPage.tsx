"use client";

import { useState } from "react";
import { Bell, Plus, Smartphone, MessageSquare } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useReminderStore } from "../hooks/useReminderStore";
import { ReminderSettings } from "./ReminderSettings";
import { ReminderList } from "./ReminderList";
import { ReminderForm } from "./ReminderForm";
import type { ReminderInput } from "../types/reminder.types";

export function RemindersPage() {
  const { reminders, toggleReminder, deleteReminder, addReminder } = useReminderStore();
  const [formOpen, setFormOpen] = useState(false);

  const handleCreateReminder = (input: ReminderInput) => {
    // Map to dummy medicine object for addReminder
    addReminder(
      {
        id: input.medicineId,
        name: input.medicineName || "Prescribed Medicine",
        normalizedName: "custom-medicine",
        strength: "",
        dosage: "1 dose",
        frequency: "Daily",
        duration: "Ongoing",
        timing: "After meals",
        route: "Oral",
        instructions: "",
        ingredients: [],
        uses: "",
        sideEffects: [],
        warnings: [],
        confidence: "High",
        needsVerification: false
      },
      input.reminderTime,
      input.days
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Medicine Reminders"
          description="Never miss a dose. Set timely daily reminders and manage notification alerts."
          icon={Bell}
        />

        <Button variant="primary" onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Add New Reminder
        </Button>
      </div>

      {/* Browser Notification Permissions Header */}
      <ReminderSettings />

      {/* List of Reminders */}
      <ReminderList
        reminders={reminders}
        onToggle={toggleReminder}
        onDelete={deleteReminder}
        onCreateNew={() => setFormOpen(true)}
      />

      {/* Omnichannel Roadmap Notice */}
      <Card className="border-sky-200/80 bg-sky-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-sky-900">Multi-Channel Reminder Support</h4>
            <p className="mt-1 text-xs text-sky-800 leading-relaxed">
              Browser alerts are active for web sessions. Mobile Push Notifications and WhatsApp message reminders are prepared for future regional patient updates.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
              <Smartphone size={14} className="text-slate-500" /> Push
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 shadow-2xs">
              <MessageSquare size={14} className="text-emerald-600" /> WhatsApp
            </span>
          </div>
        </div>
      </Card>

      {formOpen && (
        <ReminderForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleCreateReminder}
        />
      )}
    </div>
  );
}
