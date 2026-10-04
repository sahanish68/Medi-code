import type { Medicine } from "@/features/medicines/types/medicine.types";

export type PrescriptionStatus =
  | "uploaded"
  | "processing"
  | "completed"
  | "failed"
  | "needs_verification";

export interface Prescription {
  id: string;
  userId?: string;
  filePath?: string;
  signedUrl?: string;
  fileName: string;
  fileType?: string;
  status: PrescriptionStatus;
  doctorName: string;
  prescriptionDate: string;
  diagnosis: string;
  summary: string;
  rawOcrText?: string;
  medicines: Medicine[];
  additionalInstructions: string;
  createdAt?: string;
}

export interface PrescriptionUploadResponse {
  prescriptionId: string;
  filePath: string;
  signedUrl?: string;
  fileName: string;
  status: PrescriptionStatus;
}

export interface UploadActionResult {
  success: boolean;
  prescriptionId?: string;
  filePath?: string;
  signedUrl?: string;
  error?: string;
}

export interface ProcessActionResult {
  success: boolean;
  prescription?: Prescription;
  error?: string;
}
