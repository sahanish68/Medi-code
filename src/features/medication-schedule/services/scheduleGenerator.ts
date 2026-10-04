import type { Medicine } from "@/features/medicines/types/medicine.types";
import type { MedicationSchedule, ScheduledDose } from "../types/schedule.types";
import { calculateDoseTimes, calculateEndDate, buildTimelineFromMedicines } from "../utils/scheduleCalculator";
import { generateId } from "@/lib/utils/id";

export function generateSchedulesForMedicines(
  medicines: Medicine[],
  startDate: string = new Date().toISOString().split("T")[0]
): {
  schedules: MedicationSchedule[];
  timeline: ScheduledDose[];
} {
  const schedules: MedicationSchedule[] = medicines.map((med) => {
    const doseTimes = calculateDoseTimes(med.frequency, med.timing);
    const times = doseTimes.map((d) => d.time);
    const endDate = calculateEndDate(startDate, med.duration);

    let scheduleType: MedicationSchedule["scheduleType"] = "daily";
    if (times.length === 1) scheduleType = "once";
    else if (times.length === 2) scheduleType = "twice_daily";
    else if (times.length === 3) scheduleType = "three_daily";
    else if (times.length > 3) scheduleType = "four_daily";

    return {
      id: generateId(),
      medicineId: med.id,
      startDate,
      endDate,
      scheduleType,
      times,
      foodInstruction: med.timing,
      enabled: true
    };
  });

  const timeline = buildTimelineFromMedicines(medicines);

  return { schedules, timeline };
}

export function generateScheduleFromMedicines(medicines: any[], startDate?: string) {
  const result = generateSchedulesForMedicines(medicines, startDate);
  return result.timeline;
}
