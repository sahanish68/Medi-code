"use client";

import { Bell } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReminderCard } from "./ReminderCard";
import type { Reminder } from "../types/reminder.types";

interface ReminderListProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateNew?: () => void;
}

export function ReminderList({ reminders, onToggle, onDelete, onCreateNew }: ReminderListProps) {
  if (!reminders || reminders.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        text="No reminders scheduled yet."
        actionLabel={onCreateNew ? "Add Your First Reminder" : undefined}
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
