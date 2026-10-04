import { describe, it, expect } from "vitest";
import { formatPrescriptionFromExtraction } from "../prescriptionParser";
import type { PrescriptionExtraction } from "@/lib/ai/schemas";

describe("Prescription Parser Service", () => {
  it("extracts multiple medicines correctly", () => {
    const rawAi: PrescriptionExtraction = {
      doctorName: "Dr. A. Sharma",
      prescriptionDate: "2026-10-01",
      diagnosis: "Acute Bronchitis",
      additionalInstructions: "Drink warm water",
      medicines: [
        {
          name: "Amoxicillin",
          strength: "500 mg",
          dosage: "1 capsule",
          frequency: "Twice daily",
          duration: "5 days",
          timing: "After food",
          route: "Oral",
          instructions: "Finish full course",
          confidenceScore: 0.95,
          needsVerification: false
        },
        {
          name: "Paracetamol",
          strength: "650 mg",
          dosage: "1 tablet",
          frequency: "As needed",
          duration: "3 days",
          timing: "After food",
          route: "Oral",
          instructions: "Take when fever exceeds 100F",
          confidenceScore: 0.9,
          needsVerification: false
        }
      ]
    };

    const result = formatPrescriptionFromExtraction(rawAi, "test_file.png", "rx-123");

    expect(result.id).toBe("rx-123");
    expect(result.doctorName).toBe("Dr. A. Sharma");
    expect(result.medicines.length).toBe(2);
    expect(result.medicines[0].name).toBe("Amoxicillin");
    expect(result.medicines[1].name).toBe("Paracetamol");
  });

  it("handles missing dosage and flags items for verification if unconfident", () => {
    const rawAi: PrescriptionExtraction = {
      doctorName: null,
      prescriptionDate: null,
      diagnosis: null,
      additionalInstructions: null,
      medicines: [
        {
          name: "UncertainMedName",
          strength: null,
          dosage: null,
          frequency: "BD",
          duration: null,
          timing: null,
          route: null,
          instructions: null,
          confidenceScore: 0.4,
          needsVerification: true
        }
      ]
    };

    const result = formatPrescriptionFromExtraction(rawAi, "blurred.jpg", "rx-456");

    expect(result.medicines[0].needsVerification).toBe(true);
    expect(result.status).toBe("needs_verification");
  });
});
