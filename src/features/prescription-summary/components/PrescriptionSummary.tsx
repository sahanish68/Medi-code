import type { Prescription } from "@/features/prescriptions/types/prescription.types";
import { generatePrescriptionSummary } from "../services/summaryService";
import { SummaryCard } from "./SummaryCard";
import { ImportantInstructions } from "./ImportantInstructions";

export function PrescriptionSummary({ prescription }: { prescription: Prescription }) {
  const summaryData = generatePrescriptionSummary(prescription);

  return (
    <div className="space-y-4">
      <SummaryCard summary={summaryData} />
      <ImportantInstructions instructions={summaryData.importantInstructions} />
    </div>
  );
}
