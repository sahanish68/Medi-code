export interface PrescriptionSummaryData {
  doctorName?: string | null;
  prescriptionDate?: string | null;
  diagnosis?: string | null;
  totalMedicines: number;
  simpleSummary: string;
  importantInstructions: string[];
  treatmentDuration?: string | null;
  requiresDoctorVerification: boolean;
}
