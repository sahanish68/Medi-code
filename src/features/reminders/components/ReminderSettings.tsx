"use client";

import { useState, useEffect } from "react";
import { Bell, Check, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ReminderService } from "../services/reminderService";

export function ReminderSettings() {
  const [hasPermission, setHasPermission] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    setHasPermission(ReminderService.hasNotificationPermission());
  }, []);

  const handleEnableNotifications = async () => {
    const perm = await ReminderService.requestNotificationPermission();
    setHasPermission(perm === "granted");
    setRequested(true);
    if (perm === "granted") {
      ReminderService.showNotification("MediDecode Reminders Active", {
        body: "You will now receive timely medicine alerts on this device."
      });
    }
  };

  return (
    <Card className="border-teal-100 bg-teal-50/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-600 text-white shadow-xs">
            <Bell size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Browser Notification Alerts</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Receive on-screen alerts when it is time to take your morning, afternoon, or evening doses.
            </p>
          </div>
        </div>

        {hasPermission ? (
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-100/80 px-3 py-1.5 text-xs font-bold text-emerald-800 shrink-0">
            <Check size={14} /> Enabled
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={handleEnableNotifications} className="shrink-0">
            Enable Alerts
          </Button>
        )}
      </div>
    </Card>
  );
}
