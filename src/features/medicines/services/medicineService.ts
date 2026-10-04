export interface ClinicalReference {
  defaultStrength: string;
  defaultInstructions: string;
  ingredients: string[];
  uses: string;
  sideEffects: string[];
  seriousWarnings: string[];
  warnings: string[];
}

export const DRUG_DATABASE: Record<string, ClinicalReference> = {
  paracetamol: {
    defaultStrength: "650 mg",
    defaultInstructions: "Take 1 tablet after meals with water as prescribed.",
    ingredients: ["Paracetamol (Acetaminophen)"],
    uses: "Commonly used to relieve mild to moderate pain (headache, body ache) and bring down high body temperature (fever).",
    sideEffects: ["Mild nausea", "Stomach upset if taken on an empty stomach"],
    seriousWarnings: [
      "Severe liver toxicity if maximum daily dose (4000 mg) is exceeded",
      "Skin rash or sudden allergic swelling (seek emergency care)",
      "Dark urine or yellowing of the skin/eyes (jaundice)"
    ],
    warnings: [
      "Never take multiple medicines containing Paracetamol at the same time",
      "Avoid alcohol while taking this medicine as it strains the liver",
      "Consult your doctor if fever lasts longer than 3 days"
    ]
  },
  amoxicillin: {
    defaultStrength: "500 mg",
    defaultInstructions: "Take at regular intervals after meals. Finish the entire prescribed course.",
    ingredients: ["Amoxicillin Trihydrate"],
    uses: "An antibiotic used to treat bacterial infections of the chest, throat, ear, sinuses, and urinary tract.",
    sideEffects: ["Mild diarrhea", "Soft stools", "Nausea or mild stomach discomfort"],
    seriousWarnings: [
      "Severe watery diarrhea with stomach cramps (C. difficile warning)",
      "Immediate allergic reaction: difficulty breathing, facial swelling, or hives"
    ],
    warnings: [
      "Complete the entire course even if you feel better to prevent antibiotic resistance",
      "Does not work against viral infections like common cold or flu",
      "Tell your doctor if you have known penicillin allergies"
    ]
  },
  pantoprazole: {
    defaultStrength: "40 mg",
    defaultInstructions: "Take 1 tablet once daily, 30 to 60 minutes before breakfast with a glass of water.",
    ingredients: ["Pantoprazole Sodium (Proton Pump Inhibitor)"],
    uses: "Reduces excessive acid produced in the stomach. Used for heartburn, acidity, GERD, and stomach ulcers.",
    sideEffects: ["Headache", "Mild flatulence", "Constipation or mild loose stools"],
    seriousWarnings: [
      "Bone fractures with very long-term high-dose use",
      "Severe magnesium deficiency or persistent watery diarrhea"
    ],
    warnings: [
      "Swallow the tablet whole; do not chew, crush, or break it",
      "Inform doctor if stomach pain persists for more than 2 weeks"
    ]
  },
  metformin: {
    defaultStrength: "500 mg",
    defaultInstructions: "Take with or immediately after food to minimize stomach upset.",
    ingredients: ["Metformin Hydrochloride"],
    uses: "Lowers blood glucose levels in adults with type 2 diabetes by improving insulin sensitivity.",
    sideEffects: ["Metallic taste in mouth", "Nausea", "Mild abdominal cramping"],
    seriousWarnings: [
      "Lactic acidosis (very rare: extreme fatigue, muscle weakness, trouble breathing)",
      "Severe dehydration warning during acute illness"
    ],
    warnings: [
      "Do not skip meals while taking diabetic medication",
      "Regularly monitor your fasting and post-meal blood sugar levels",
      "Avoid excessive alcohol intake"
    ]
  },
  cetirizine: {
    defaultStrength: "10 mg",
    defaultInstructions: "Take 1 tablet once daily in the evening or at bedtime.",
    ingredients: ["Cetirizine Dihydrochloride"],
    uses: "An antihistamine used for allergy relief (sneezing, runny nose, watery eyes, itching, and hives).",
    sideEffects: ["Drowsiness", "Dry mouth", "Mild dizziness"],
    seriousWarnings: [
      "Severe urinary retention (especially in elderly or with prostate conditions)",
      "Severe allergic angioedema (rare)"
    ],
    warnings: [
      "May cause sleepiness; avoid driving, riding motorbikes, or handling heavy machinery",
      "Avoid alcoholic beverages as they increase sedation"
    ]
  },
  azithromycin: {
    defaultStrength: "500 mg",
    defaultInstructions: "Take once daily at the same fixed time, 1 hour before or 2 hours after meals.",
    ingredients: ["Azithromycin Dihydrate (Macrolide Antibiotic)"],
    uses: "Used for treating bacterial infections of the respiratory tract, tonsils, ear, and skin.",
    sideEffects: ["Mild stomach cramps", "Nausea", "Mild loss of appetite"],
    seriousWarnings: [
      "Irregular heart rhythm (QT prolongation warning)",
      "Severe persistent vomiting or severe diarrhea"
    ],
    warnings: [
      "Finish the entire 3 or 5-day course as instructed",
      "Do not take simultaneously with magnesium or aluminum-containing antacids"
    ]
  },
  atorvastatin: {
    defaultStrength: "10 mg",
    defaultInstructions: "Take 1 tablet once daily in the evening or at bedtime.",
    ingredients: ["Atorvastatin Calcium"],
    uses: "A statin used to lower bad cholesterol (LDL) and triglycerides and reduce the risk of heart disease.",
    sideEffects: ["Mild digestive disturbance", "Joint or mild muscle ache", "Headache"],
    seriousWarnings: [
      "Unexplained intense muscle tenderness or weakness (rhabdomyolysis warning)",
      "Liver inflammation (dark urine, yellow eyes)"
    ],
    warnings: [
      "Report any unexplained, severe muscle pain immediately to your doctor",
      "Contraindicated during pregnancy and breastfeeding",
      "Avoid excessive consumption of grapefruit juice"
    ]
  }
};

/**
 * Matches drug name keywords to clinical database
 */
export function getClinicalReferenceForDrug(drugName: string): ClinicalReference {
  const normalized = drugName.toLowerCase();

  for (const [key, ref] of Object.entries(DRUG_DATABASE)) {
    if (normalized.includes(key)) {
      return ref;
    }
  }

  // Common Indian brand alias lookups
  if (normalized.includes("dolo") || normalized.includes("crocin") || normalized.includes("calpol") || normalized.includes("pcm")) {
    return DRUG_DATABASE.paracetamol;
  }
  if (normalized.includes("augmentin") || normalized.includes("mox") || normalized.includes("clav")) {
    return DRUG_DATABASE.amoxicillin;
  }
  if (normalized.includes("pan-40") || normalized.includes("pan 40") || normalized.includes("pantocid")) {
    return DRUG_DATABASE.pantoprazole;
  }
  if (normalized.includes("glycomet") || normalized.includes("obimet")) {
    return DRUG_DATABASE.metformin;
  }
  if (normalized.includes("cetzine") || normalized.includes("alerid") || normalized.includes("okacet")) {
    return DRUG_DATABASE.cetirizine;
  }
  if (normalized.includes("azee") || normalized.includes("azithral")) {
    return DRUG_DATABASE.azithromycin;
  }
  if (normalized.includes("atorva") || normalized.includes("storvas") || normalized.includes("lipitor")) {
    return DRUG_DATABASE.atorvastatin;
  }

  // Default generic safe guidance
  return {
    defaultStrength: "Standard therapeutic dose",
    defaultInstructions: "Take exactly as directed by your physician or pharmacist.",
    ingredients: [drugName],
    uses: "Prescribed medicine for therapeutic treatment. Consult your doctor for specific indications.",
    sideEffects: ["May cause mild nausea or digestive changes"],
    seriousWarnings: [
      "Sudden allergic reaction (facial swelling, breathing trouble)",
      "Unusual severe symptoms not present before treatment"
    ],
    warnings: [
      "Always verify dosage, duration, and safety warnings with a qualified healthcare professional",
      "Do not alter dosage without consulting your doctor"
    ]
  };
}
