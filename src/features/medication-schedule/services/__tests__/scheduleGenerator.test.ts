import { describe, it, expect } from "vitest";
import { generateScheduleFromMedicines } from "../scheduleGenerator";
import type { Medicine } from "@/features/medicines/types/medicine.types";

describe("Schedule Generator Service", () => {
  const sampleMedicines: Medicine[] = [
    {
      id: "med-1",
      prescriptionId: "rx-1",
      name: "Paracetamol 500 mg",
      normalizedName: "paracetamol-500mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "5 days",
      timing: "After food",
      strength: "500 mg",
      route: "Oral",
      instructions: "Take after food.",
      uses: "Fever relief.",
      ingredients: ["Paracetamol"],
      sideEffects: [],
      warnings: [],
      confidence: "High",
      needsVerification: false
    },
    {
      id: "med-2",
      prescriptionId: "rx-1",
      name: "Omeprazole 20 mg",
      normalizedName: "omeprazole-20mg",
      dosage: "1 capsule",
      frequency: "Once daily",
      duration: "7 days",
      timing: "Before food",
      strength: "20 mg",
      route: "Oral",
      instructions: "Take before food.",
      uses: "Acid reflux.",
      ingredients: ["Omeprazole"],
      sideEffects: [],
      warnings: [],
      confidence: "High",
      needsVerification: false
    }
  ];

  it("generates structured dose timelines for once and twice daily frequencies", () => {
    const schedule = generateScheduleFromMedicines(sampleMedicines);

    expect(schedule.length).toBeGreaterThan(0);
    const morningDoses = schedule.filter((s) => s.time === "08:00 AM");
    expect(morningDoses.length).toBe(2); // Both Paracetamol and Omeprazole in morning

    const eveningDoses = schedule.filter((s) => s.time === "08:00 PM");
    expect(eveningDoses.length).toBe(1); // Only Paracetamol in evening
  });
});
