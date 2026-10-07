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
        confidenceScore: 0.95,
        needsVerification: false
      },
      input.reminderTime,
      input.days
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Medicine Reminders"
          description="Never miss a dose. Set timely daily reminders and manage notification alerts."
          icon={Bell}
        />

        <Button variant="glow" onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Add New Reminder
        </Button>
      </div>

      {/* Notification Permissions Header */}
      <ReminderSettings />

      {/* List of Reminders */}
      <ReminderList
        reminders={reminders}
        onToggle={toggleReminder}
        onDelete={deleteReminder}
        onCreateNew={() => setFormOpen(true)}
      />

      {/* Omnichannel Notice */}
      <Card className="border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/80 backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Channel Reminder Support</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Browser alerts are active for Web sessions. Mobile Push & WhatsApp notifications are integrated into patient preferences.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 rounded-lg bg-cyan-50 dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
              <Smartphone size={14} className="text-cyan-600 dark:text-cyan-400" /> Push Active
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
              <MessageSquare size={14} className="text-emerald-600 dark:text-emerald-400" /> WhatsApp
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
