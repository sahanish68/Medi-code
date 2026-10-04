"use server";

import { generateSchedulesForMedicines } from "../services/scheduleGenerator";
import type { Medicine } from "@/features/medicines/types/medicine.types";
import type { MedicationSchedule, ScheduledDose } from "../types/schedule.types";

export async function generateScheduleAction(
  medicines: Medicine[],
  startDate?: string
): Promise<{
  success: boolean;
  schedules: MedicationSchedule[];
  timeline: ScheduledDose[];
  error?: string;
}> {
  try {
    const result = generateSchedulesForMedicines(medicines, startDate);
    return {
      success: true,
      schedules: result.schedules,
      timeline: result.timeline
    };
  } catch (err: any) {
    return {
      success: false,
      schedules: [],
      timeline: [],
      error: err.message
    };
  }
}
