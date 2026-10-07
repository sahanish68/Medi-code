export type ConfidenceLevel = "High" | "Medium" | "Needs verification";

export interface MedicineAlternative {
  name: string;
  genericName?: string;
  score: number;
}

export interface Medicine {
  id: string;
  prescriptionId?: string;
  name: string;
  rawName?: string;
  matchedName?: string | null;
  normalizedName: string;
  matchType?: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: string;
  route: string;
  instructions: string;
  ingredients: string[];
  uses: string;
  sideEffects: string[];
  seriousWarnings?: string[];
  warnings: string[];
  confidence: ConfidenceLevel;
  confidenceScore: number;
  needsVerification: boolean;
  status?: "verified_candidate" | "review" | "uncertain";
  alternatives?: MedicineAlternative[];
  aiPrediction?: string;
  userConfirmed?: boolean;
  createdAt?: string;
}

export interface ExtractedMedicineInput {
  name: string;
  rawName?: string;
  matchedName?: string | null;
  matchType?: string;
  strength?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  timing?: string | null;
  route?: string | null;
  instructions?: string | null;
  confidenceScore: number;
  needsVerification: boolean;
}
