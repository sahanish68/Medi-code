export type ScheduleType = "once" | "daily" | "twice_daily" | "three_daily" | "four_daily" | "custom";

export interface ScheduledDose {
  time: string; // e.g. "08:00 AM"
  medicineId: string;
  medicineName: string;
  strength: string;
  dosage: string;
  timing: string; // e.g. "After breakfast"
  isTaken?: boolean;
}

export interface MedicationSchedule {
  id: string;
  medicineId: string;
  userId?: string;
  startDate: string;
  endDate?: string;
  scheduleType: ScheduleType;
  times: string[];
  foodInstruction?: string;
  enabled: boolean;
}
