"use client";

import { Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GenerateScheduleButtonProps {
  onGenerate: () => void;
  isLoading?: boolean;
}

export function GenerateScheduleButton({ onGenerate, isLoading = false }: GenerateScheduleButtonProps) {
  return (
    <Button variant="primary" onClick={onGenerate} isLoading={isLoading}>
      {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Calendar size={16} />}
      Auto-Generate Schedule
    </Button>
  );
}
