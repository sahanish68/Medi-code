import type { Prescription } from "@/features/prescriptions/types/prescription.types";
import type { PrescriptionSummaryData } from "../types/summary.types";

export function generatePrescriptionSummary(prescription: Prescription): PrescriptionSummaryData {
  const medicines = prescription.medicines || [];
  const total = medicines.length;

  const afterFood = medicines.filter((m) =>
    m.timing.toLowerCase().includes("after")
  ).length;
  const beforeFood = medicines.filter((m) =>
    m.timing.toLowerCase().includes("before")
  ).length;

  let simpleSummary = `You have been prescribed ${total} medicine${total === 1 ? "" : "s"}.`;
  if (total > 0) {
    if (afterFood > 0 && beforeFood > 0) {
      simpleSummary += ` ${afterFood} are to be taken after food and ${beforeFood} before food on an empty stomach.`;
    } else if (afterFood > 0) {
      simpleSummary += ` All to be taken after meals.`;
    } else if (beforeFood > 0) {
      simpleSummary += ` All to be taken before meals (empty stomach).`;
    }
  }

  // Extract important instructions
  const importantInstructions: string[] = [];

  const antibiotics = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes("amox") ||
      m.name.toLowerCase().includes("azith") ||
      m.name.toLowerCase().includes("cefix") ||
      m.name.toLowerCase().includes("clav")
  );
  if (antibiotics.length > 0) {
    importantInstructions.push(
      "Complete the entire antibiotic course as prescribed, even if symptoms improve."
    );
  }

  const sedatives = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes("cetirizine") ||
      m.name.toLowerCase().includes("levocet") ||
      m.name.toLowerCase().includes("cough")
  );
  if (sedatives.length > 0) {
    importantInstructions.push(
      "Some medicines may cause drowsiness. Avoid driving or riding motorbikes after taking them."
    );
  }

  const antacids = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes("pantop") ||
      m.name.toLowerCase().includes("omep") ||
      m.name.toLowerCase().includes("rabep")
  );
  if (antacids.length > 0) {
    importantInstructions.push(
      "Take your antacid tablet 30 minutes before breakfast with a glass of water."
    );
  }

  const requiresDoctorVerification = medicines.some((m) => m.needsVerification);
  if (requiresDoctorVerification) {
    importantInstructions.push(
      "Some handwritten entries could not be read with high certainty. Please verify the marked items with your pharmacist or doctor."
    );
  }

  // Longest duration
  const durations = medicines.map((m) => m.duration).filter(Boolean);
  const treatmentDuration = durations.length > 0 ? durations[0] : "As advised by doctor";

  return {
    doctorName: prescription.doctorName,
    prescriptionDate: prescription.prescriptionDate,
    diagnosis: prescription.diagnosis,
    totalMedicines: total,
    simpleSummary,
    importantInstructions,
    treatmentDuration,
    requiresDoctorVerification
  };
}
