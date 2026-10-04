import type { ScheduledDose } from "../types/schedule.types";
import type { Medicine } from "@/features/medicines/types/medicine.types";

export interface NormalizedScheduleTime {
  time: string;
  period: "morning" | "afternoon" | "evening" | "night";
  foodTiming: string;
}

/**
 * Normalizes prescription frequency into reliable daily schedule times.
 */
export function calculateDoseTimes(
  frequency: string,
  timing: string
): NormalizedScheduleTime[] {
  const normFreq = frequency.toLowerCase().trim();
  const isBeforeFood = timing.toLowerCase().includes("before");
  const foodSuffix = isBeforeFood ? "Before meal (empty stomach)" : "After meal";

  // TDS / TID / 1-1-1 / Three times daily
  if (
    normFreq.includes("three") ||
    normFreq.includes("tds") ||
    normFreq.includes("tid") ||
    normFreq.includes("1-1-1") ||
    normFreq === "3 times"
  ) {
    return [
      { time: "08:00 AM", period: "morning", foodTiming: isBeforeFood ? "Before breakfast" : "After breakfast" },
      { time: "02:00 PM", period: "afternoon", foodTiming: isBeforeFood ? "Before lunch" : "After lunch" },
      { time: "08:00 PM", period: "night", foodTiming: isBeforeFood ? "Before dinner" : "After dinner" }
    ];
  }

  // BD / BID / 1-0-1 / Twice daily
  if (
    normFreq.includes("twice") ||
    normFreq.includes("bd") ||
    normFreq.includes("bid") ||
    normFreq.includes("1-0-1") ||
    normFreq === "2 times"
  ) {
    return [
      { time: "08:00 AM", period: "morning", foodTiming: isBeforeFood ? "Before breakfast" : "After breakfast" },
      { time: "08:00 PM", period: "night", foodTiming: isBeforeFood ? "Before dinner" : "After dinner" }
    ];
  }

  // Four times daily / QID / 1-1-1-1
  if (
    normFreq.includes("four") ||
    normFreq.includes("qid") ||
    normFreq.includes("1-1-1-1") ||
    normFreq === "4 times"
  ) {
    return [
      { time: "08:00 AM", period: "morning", foodTiming: isBeforeFood ? "Before breakfast" : "After breakfast" },
      { time: "12:30 PM", period: "afternoon", foodTiming: isBeforeFood ? "Before lunch" : "After lunch" },
      { time: "05:00 PM", period: "evening", foodTiming: "Evening snack" },
      { time: "09:30 PM", period: "night", foodTiming: isBeforeFood ? "Before dinner" : "After dinner" }
    ];
  }

  // At bedtime / HS / 0-0-1
  if (normFreq.includes("bedtime") || normFreq.includes("hs") || normFreq.includes("night") || normFreq === "0-0-1") {
    return [
      { time: "09:30 PM", period: "night", foodTiming: "At bedtime" }
    ];
  }

  // OD / Once daily / 1-0-0
  return [
    { time: "08:00 AM", period: "morning", foodTiming: isBeforeFood ? "Before breakfast" : "After breakfast" }
  ];
}

/**
 * Computes end date given start date string (YYYY-MM-DD) and duration string (e.g. "5 days", "1 week")
 */
export function calculateEndDate(startDateStr: string, durationStr: string): string {
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) return startDateStr;

  let days = 5;
  const match = durationStr.match(/(\d+)\s*(day|week|month)/i);
  if (match) {
    const num = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("week")) days = num * 7;
    else if (unit.startsWith("month")) days = num * 30;
    else days = num;
  }

  const end = new Date(start);
  end.setDate(end.getDate() + days);
  return end.toISOString().split("T")[0];
}

/**
 * Generates structured dose timeline from an array of medicines
 */
export function buildTimelineFromMedicines(medicines: Medicine[]): ScheduledDose[] {
  const doses: ScheduledDose[] = [];

  for (const med of medicines) {
    const times = calculateDoseTimes(med.frequency, med.timing);
    for (const t of times) {
      doses.push({
        time: t.time,
        medicineId: med.id,
        medicineName: med.name,
        strength: med.strength,
        dosage: med.dosage,
        timing: t.foodTiming,
        isTaken: false
      });
    }
  }

  // Sort chronological by 24h hour
  const timeToMinutes = (t: string) => {
    const [timePart, modifier] = t.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + (minutes || 0);
  };

  return doses.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}
