import { prescriptionExtractionSchema, type PrescriptionExtraction } from "./schemas";
import { OcrEngineResult } from "@/features/prescriptions/services/ocrEngine";
import { MatchedMedicineResult } from "@/features/prescriptions/services/matchingPipeline";

export interface ExtendedExtractionResult extends PrescriptionExtraction {
  ocrDetails?: OcrEngineResult;
  matchedResults?: MatchedMedicineResult[];
}

export const MOCK_PRESCRIPTION_DATASETS: ExtendedExtractionResult[] = [
  // 1. Acute Fever & Upper Respiratory Tract Infection
  {
    doctorName: "Dr. Rajesh Sharma, MD",
    prescriptionDate: "2026-10-07",
    diagnosis: "Acute Nasopharyngitis & Febrile Illness",
    additionalInstructions: "Take medicines strictly after meals with warm water. Rest adequately and maintain hydration.",
    medicines: [
      {
        name: "Paracetamol",
        strength: "650 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet after meals for fever and body ache.",
        confidenceScore: 0.98,
        needsVerification: false
      },
      {
        name: "Azithromycin",
        strength: "500 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "3 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet daily for 3 days to treat throat infection.",
        confidenceScore: 0.96,
        needsVerification: false
      },
      {
        name: "Pantoprazole",
        strength: "40 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "5 days",
        timing: "Before meals",
        route: "Oral",
        instructions: "Swallow whole on empty stomach 30 mins before breakfast.",
        confidenceScore: 0.97,
        needsVerification: false
      }
    ]
  },
  // 2. Bronchial Asthma & Allergic Rhinitis
  {
    doctorName: "Dr. Ananya Verma, MD (Pulmonology)",
    prescriptionDate: "2026-10-06",
    diagnosis: "Allergic Asthma & Seasonal Bronchospasm",
    additionalInstructions: "Inhale warm steam twice daily. Avoid cold beverages and dust exposure.",
    medicines: [
      {
        name: "Levocetirizine and Montelukast",
        strength: "5 mg + 10 mg",
        dosage: "1 tablet",
        frequency: "0-0-1 (Once daily at bedtime)",
        duration: "10 days",
        timing: "After dinner",
        route: "Oral",
        instructions: "Take 1 tablet nightly at bedtime to prevent night cough and allergic wheezing.",
        confidenceScore: 0.95,
        needsVerification: false
      },
      {
        name: "Pantoprazole",
        strength: "40 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "7 days",
        timing: "Empty stomach",
        route: "Oral",
        instructions: "Take 1 tablet 30 minutes before food in morning.",
        confidenceScore: 0.94,
        needsVerification: false
      }
    ]
  },
  // 3. Acute Gastroenteritis & Dehydration
  {
    doctorName: "Dr. Suresh Mehta, MD (Gastroenterology)",
    prescriptionDate: "2026-10-05",
    diagnosis: "Acute Bacterial Gastroenteritis",
    additionalInstructions: "Drink oral rehydration solution frequently. Stick to light bland diet (rice porridge, banana).",
    medicines: [
      {
        name: "Metronidazole",
        strength: "400 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet twice daily after meals. Avoid alcohol completely.",
        confidenceScore: 0.96,
        needsVerification: false
      },
      {
        name: "Ondansetron",
        strength: "4 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (As needed)",
        duration: "3 days",
        timing: "Before food",
        route: "Oral",
        instructions: "Take 30 minutes before food if nausea occurs.",
        confidenceScore: 0.95,
        needsVerification: false
      }
    ]
  },
  // 4. Osteoarthritis & Joint Pain
  {
    doctorName: "Dr. Vikramaditya Singh, MS (Orthopedics)",
    prescriptionDate: "2026-10-04",
    diagnosis: "Right Knee Osteoarthritis & Joint Inflammation",
    additionalInstructions: "Apply warm compress to affected joint. Avoid heavy weight lifting or stair climbing.",
    medicines: [
      {
        name: "Aceclofenac and Paracetamol",
        strength: "100 mg + 325 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet after meals for joint pain relief.",
        confidenceScore: 0.97,
        needsVerification: false
      },
      {
        name: "Rabeprazole",
        strength: "20 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "10 days",
        timing: "Empty stomach",
        route: "Oral",
        instructions: "Take on empty stomach 30 mins before morning meal.",
        confidenceScore: 0.94,
        needsVerification: false
      }
    ]
  },
  // 5. Type 2 Diabetes Mellitus
  {
    doctorName: "Dr. Priya Nair, MD, DM (Endocrinology)",
    prescriptionDate: "2026-10-03",
    diagnosis: "Type 2 Diabetes Mellitus & Dyslipidemia",
    additionalInstructions: "Maintain low glycemic index diet. Walk 30 minutes daily and log fasting glucose weekly.",
    medicines: [
      {
        name: "Metformin",
        strength: "500 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "30 days",
        timing: "With meals",
        route: "Oral",
        instructions: "Take with breakfast and dinner to lower blood sugar.",
        confidenceScore: 0.98,
        needsVerification: false
      },
      {
        name: "Atorvastatin",
        strength: "10 mg",
        dosage: "1 tablet",
        frequency: "0-0-1 (Once daily at bedtime)",
        duration: "30 days",
        timing: "After dinner",
        route: "Oral",
        instructions: "Take 1 tablet nightly at bedtime to manage cholesterol.",
        confidenceScore: 0.97,
        needsVerification: false
      }
    ]
  },
  // 6. Hypertension & Cardiac Protection
  {
    doctorName: "Dr. K. V. Ramanathan, MD, DM (Cardiology)",
    prescriptionDate: "2026-10-02",
    diagnosis: "Stage 1 Essential Hypertension",
    additionalInstructions: "Restrict dietary sodium intake. Monitor blood pressure every morning.",
    medicines: [
      {
        name: "Telmisartan",
        strength: "40 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "30 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet every morning with water.",
        confidenceScore: 0.98,
        needsVerification: false
      }
    ]
  },
  // 7. Urinary Tract Infection
  {
    doctorName: "Dr. Neha Agarwal, MS (Urology)",
    prescriptionDate: "2026-10-01",
    diagnosis: "Acute Uncomplicated Cystitis / UTI",
    additionalInstructions: "Drink at least 3 liters of fluids daily to flush urinary system.",
    medicines: [
      {
        name: "Ciprofloxacin",
        strength: "500 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet every 12 hours after meals for 5 days.",
        confidenceScore: 0.96,
        needsVerification: false
      },
      {
        name: "Paracetamol",
        strength: "500 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (As needed)",
        duration: "3 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take for pelvic ache or fever relief.",
        confidenceScore: 0.95,
        needsVerification: false
      }
    ]
  },
  // 8. Tonsillitis & Severe Sore Throat
  {
    doctorName: "Dr. Amit Sengupta, MS (ENT)",
    prescriptionDate: "2026-09-30",
    diagnosis: "Acute Follicular Tonsillitis",
    additionalInstructions: "Gargle with warm salt water thrice daily. Avoid oily & spicy foods.",
    medicines: [
      {
        name: "Amoxicillin and Potassium Clavulanate",
        strength: "625 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take 1 tablet after meals for 5 complete days.",
        confidenceScore: 0.97,
        needsVerification: false
      },
      {
        name: "Ibuprofen and Paracetamol",
        strength: "400 mg + 325 mg",
        dosage: "1 tablet",
        frequency: "1-0-1 (Twice daily)",
        duration: "3 days",
        timing: "After food",
        route: "Oral",
        instructions: "Take after meals to reduce throat pain and swelling.",
        confidenceScore: 0.96,
        needsVerification: false
      }
    ]
  },
  // 9. Acid Peptic Disease & GERD
  {
    doctorName: "Dr. Ritu Kapoor, MD (Gastroenterology)",
    prescriptionDate: "2026-09-29",
    diagnosis: "Gastroesophageal Reflux Disease (GERD) & Acidity",
    additionalInstructions: "Avoid late night meals, caffeine, and tight clothing around waist.",
    medicines: [
      {
        name: "Rabeprazole",
        strength: "20 mg",
        dosage: "1 tablet",
        frequency: "1-0-0 (Once daily)",
        duration: "14 days",
        timing: "Empty stomach",
        route: "Oral",
        instructions: "Take 30 minutes before breakfast on empty stomach.",
        confidenceScore: 0.98,
        needsVerification: false
      }
    ]
  },
  // 10. Allergy & Acute Dermatitis
  {
    doctorName: "Dr. Sanjeev Kapoor, MD (Dermatology)",
    prescriptionDate: "2026-09-28",
    diagnosis: "Acute Contact Dermatitis & Pruritic Hives",
    additionalInstructions: "Use soap-free gentle cleanser. Avoid scratching affected skin areas.",
    medicines: [
      {
        name: "Cetirizine",
        strength: "10 mg",
        dosage: "1 tablet",
        frequency: "0-0-1 (Once daily at bedtime)",
        duration: "7 days",
        timing: "After dinner",
        route: "Oral",
        instructions: "Take 1 tablet at bedtime. May cause mild drowsiness.",
        confidenceScore: 0.97,
        needsVerification: false
      }
    ]
  }
];

export async function extractPrescriptionWithAI(params: {
  imageBase64?: string;
  mimeType?: string;
  rawText?: string;
  fileName?: string;
  fileBuffer?: Buffer;
}): Promise<ExtendedExtractionResult> {
  // Randomly select 1 out of 10 mockup prescription datasets
  const randomIndex = Math.floor(Math.random() * MOCK_PRESCRIPTION_DATASETS.length);
  const selectedMock = MOCK_PRESCRIPTION_DATASETS[randomIndex];

  return {
    ...selectedMock,
    medicines: selectedMock.medicines.map((m) => ({ ...m }))
  };
}
