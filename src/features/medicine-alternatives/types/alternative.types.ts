export interface MedicineAlternative {
  id: string;
  medicineId: string;
  prescribedMedicineName: string;
  alternativeName: string;
  activeIngredient: string;
  strength: string;
  dosageForm: string;
  manufacturer?: string;
  isJanAushadhiGeneric?: boolean;
  approximatePriceRatio?: string; // e.g. "50-80% lower cost"
  source: string;
  confidenceScore: number;
  verificationRequired: boolean;
}
