import { prescriptionExtractionSchema, type PrescriptionExtraction } from "./schemas";
import { PRESCRIPTION_SYSTEM_PROMPT } from "./prompts";

/**
 * AI / Vision Client for prescription processing.
 * Dual-engine architecture:
 * 1. Gemini AI Vision (Primary High Accuracy engine for handwritten & printed prescriptions)
 * 2. Local Clinical Rules & Regex Engine (Secondary offline / fallback engine)
 */
export async function extractPrescriptionWithAI(params: {
  imageBase64?: string;
  mimeType?: string;
  rawText?: string;
  fileName?: string;
  fileFingerprint?: string;
}): Promise<PrescriptionExtraction> {
  const apiKey =
    process.env.AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // 1. External AI / Vision API call if API key configured
  if (apiKey && params.imageBase64) {
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro"
    ];

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: PRESCRIPTION_SYSTEM_PROMPT },
                    {
                      inlineData: {
                        mimeType: params.mimeType || "image/jpeg",
                        data: params.imageBase64
                      }
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.1
              }
            })
          }
        );

        if (response.ok) {
          const result = await response.json();
          const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsedJson = JSON.parse(candidateText);
            const validated = prescriptionExtractionSchema.safeParse(parsedJson);
            if (validated.success) {
              return validated.data;
            }
          }
        } else {
          console.warn(`Gemini model ${model} returned error status:`, response.status, await response.text());
        }
      } catch (err) {
        console.warn(`Gemini API call with ${model} failed:`, err);
      }
    }
  }

  // 2. Perform server OCR on image if base64 is present and rawText is not provided
  let ocrText = params.rawText || "";

  if (!ocrText && params.imageBase64) {
    try {
      const tesseract = await import("tesseract.js");
      if (tesseract && typeof tesseract.recognize === "function") {
        const imageBuffer = Buffer.from(params.imageBase64, "base64");
        const ret = await tesseract.recognize(imageBuffer, "eng");
        ocrText = ret?.data?.text || "";
      }
    } catch (err) {
      console.warn("Server Tesseract OCR recognize fallback skipped:", err);
    }
  }

  // 3. Process extracted text through Clinical NLP Heuristics
  return parsePrescriptionLocally(
    ocrText,
    params.fileName || "prescription.jpg",
    params.fileFingerprint || params.imageBase64?.substring(0, 100) || ""
  );
}

/**
 * Known Drug Brands & Generic Names Dictionary for Matching
 */
const DRUGS_DICTIONARY = [
  { keywords: ["dolo", "paracetamol", "crocin", "calpol", "pcm", "pacimol"], name: "Paracetamol", defaultStrength: "650 mg", timing: "After food", frequency: "Twice daily", uses: "Fever and body pain relief" },
  { keywords: ["amox", "mox", "amoxicillin", "augmentin", "moxikind", "clavam"], name: "Amoxicillin & Potassium Clavulanate", defaultStrength: "625 mg", timing: "After food", frequency: "Twice daily", uses: "Bacterial infection treatment" },
  { keywords: ["pantop", "pan-40", "pantocid", "pantoprazole", "pantodac", "pan 40"], name: "Pantoprazole Gastro-Resistant", defaultStrength: "40 mg", timing: "Before food", frequency: "Once daily (Morning)", uses: "Acid reflux and stomach protection" },
  { keywords: ["cetirizine", "cetzine", "alerid", "okacet", "zyrtec"], name: "Cetirizine Hydrochloride", defaultStrength: "10 mg", timing: "At bedtime", frequency: "Once daily", uses: "Allergy and runny nose relief" },
  { keywords: ["azithral", "azithromycin", "azee", "zady"], name: "Azithromycin", defaultStrength: "500 mg", timing: "Before food", frequency: "Once daily", uses: "Respiratory and throat infection" },
  { keywords: ["glycomet", "metformin", "gluformin", "obimet"], name: "Metformin Hydrochloride SR", defaultStrength: "500 mg", timing: "After food", frequency: "Twice daily", uses: "Blood sugar management" },
  { keywords: ["atorva", "atorvastatin", "storvas", "lipikind"], name: "Atorvastatin Calcium", defaultStrength: "10 mg", timing: "At bedtime", frequency: "Once daily", uses: "Cholesterol control" },
  { keywords: ["telma", "telmisartan", "tazloc", "telpres"], name: "Telmisartan", defaultStrength: "40 mg", timing: "Morning", frequency: "Once daily", uses: "High blood pressure control" },
  { keywords: ["amlopress", "amlodipine", "amlogard", "stamlo"], name: "Amlodipine Besylate", defaultStrength: "5 mg", timing: "Morning", frequency: "Once daily", uses: "Blood pressure regulation" },
  { keywords: ["montair", "montelukast", "romilast", "montek"], name: "Montelukast & Levocetirizine", defaultStrength: "10 mg + 5 mg", timing: "At bedtime", frequency: "Once daily", uses: "Asthma & allergic rhinitis" },
  { keywords: ["combiflam", "ibuprofen", "brufen"], name: "Ibuprofen & Paracetamol", defaultStrength: "400 mg", timing: "After food", frequency: "Twice daily", uses: "Pain & inflammation relief" },
  { keywords: ["zerodol", "aceclofenac", "hifenac"], name: "Aceclofenac & Paracetamol", defaultStrength: "100 mg + 325 mg", timing: "After food", frequency: "Twice daily", uses: "Joint and muscle pain relief" },
  { keywords: ["rabeloc", "rabeprazole", "cyra", "razo"], name: "Rabeprazole Sodium", defaultStrength: "20 mg", timing: "Before food", frequency: "Once daily", uses: "Hyperacidity relief" },
  { keywords: ["cifran", "ciprofloxacin", "ciplox"], name: "Ciprofloxacin", defaultStrength: "500 mg", timing: "After food", frequency: "Twice daily", uses: "Urinary & bacterial infection" },
  { keywords: ["levomac", "levofloxacin", "lcin"], name: "Levofloxacin", defaultStrength: "500 mg", timing: "After food", frequency: "Once daily", uses: "Severe respiratory infection" }
];

/**
 * Intelligent Local Clinical NLP & Rule-Based Prescription Parser
 */
export function parsePrescriptionLocally(
  rawText: string,
  fileName: string,
  fingerprint: string = ""
): PrescriptionExtraction {
  const text = rawText || "";
  const textLower = text.toLowerCase();
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // Check if document contains Non-Medical / Billing terms with NO medical keywords
  const nonMedicalKeywords = ["college", "tuition", "fee", "semester", "roll no", "admission", "invoice", "payment receipt", "receipt no"];
  const isNonMedicalDocument = nonMedicalKeywords.some(kw => textLower.includes(kw));

  // 1. Doctor Name Extraction
  let doctorName: string | null = null;
  const docLine = lines.find((l) => /^(dr\.?|doctor|dr\s)/i.test(l) || /consultant|physician|mbbs|md|ms/i.test(l));
  if (docLine) {
    doctorName = docLine.replace(/^(dr\.?|doctor)\s*/i, "Dr. ");
  }

  // 2. Prescription Date Extraction
  let prescriptionDate: string | null = null;
  const dateMatch = text.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/);
  if (dateMatch) {
    prescriptionDate = dateMatch[1];
  }

  // 3. Diagnosis Extraction
  let diagnosis = isNonMedicalDocument ? "Non-Prescription Document Detected" : "Prescription Evaluation";

  // 4. Extract Medicines from Text
  const matchedMedicines: any[] = [];
  const addedNames = new Set<string>();

  // A. Check against Known Drug Dictionary
  for (const drug of DRUGS_DICTIONARY) {
    const matchedKeyword = drug.keywords.find((k) => textLower.includes(k));
    if (matchedKeyword) {
      let strength = drug.defaultStrength;
      const strengthMatch = textLower.match(new RegExp(`${matchedKeyword}[^\\d]*(\\d+\\s*(?:mg|gm|mcg|ml))`, "i"));
      if (strengthMatch) {
        strength = strengthMatch[1].toUpperCase();
      }

      let frequency = drug.frequency;
      if (/1-0-1|bd|twice/i.test(textLower)) frequency = "Twice daily";
      else if (/1-1-1|tds|tid|three/i.test(textLower)) frequency = "Three times daily";
      else if (/1-0-0|0-0-1|od|once/i.test(textLower)) frequency = "Once daily";

      matchedMedicines.push({
        name: drug.name,
        strength,
        dosage: "1 tablet",
        frequency,
        duration: "5 days",
        timing: drug.timing,
        route: "Oral",
        instructions: `Take ${drug.timing.toLowerCase()}. ${drug.uses}.`,
        confidenceScore: 0.95,
        needsVerification: false
      });
      addedNames.add(drug.name.toLowerCase());
    }
  }

  // B. Generic Line-by-Line Prescription Extractor
  for (const line of lines) {
    if (/^(dr\.?|doctor|date:|diagnosis:|patient:|rx:|age:|sex:|gender:)/i.test(line)) continue;

    const lineLower = line.toLowerCase();

    const isNumberedLine = /^(?:\d+[\.\)]|\-|\*|rx|tab|cap|syr|inj|t\.|c\.)/i.test(line);
    const hasDosageUnit = /\b(\d+\s*(?:mg|mcg|gm|g|ml|tablets|capsules|tabs|caps|iu))\b/i.test(line);
    const hasFrequency = /\b(1-0-1|1-0-0|0-0-1|1-1-1|bd|tid|qid|od|hs|sos|twice|once|daily)\b/i.test(line);

    if (isNumberedLine || (hasDosageUnit && (hasFrequency || line.length < 60))) {
      let cleanName = line
        .replace(/^(?:\d+[\.\)]|\-|\*|rx:?|tab\.?|cap\.?|syr\.?|inj\.?|t\.|c\.)\s*/i, "")
        .replace(/\b(1-0-1|1-0-0|0-0-1|1-1-1|bd|tid|qid|od|hs|sos|once|twice|daily|after food|before food|for \d+ days)\b/gi, "")
        .trim();

      const strengthMatch = line.match(/\b(\d+\s*(?:mg|mcg|gm|g|ml))\b/i);
      const strength = strengthMatch ? strengthMatch[1].toUpperCase() : "As prescribed";

      let frequency = "Twice daily";
      if (/1-0-1|bd|twice/i.test(lineLower)) frequency = "Twice daily (Morning & Night)";
      else if (/1-1-1|tds|tid|three/i.test(lineLower)) frequency = "Three times daily";
      else if (/1-0-0|od|once/i.test(lineLower)) frequency = "Once daily (Morning)";
      else if (/0-0-1|hs|bedtime/i.test(lineLower)) frequency = "Once daily at bedtime";
      else if (/sos|as needed/i.test(lineLower)) frequency = "As needed (SOS)";

      let timing = "After food";
      if (/before|ac|empty stomach/i.test(lineLower)) timing = "Before food";

      const durationMatch = line.match(/\b(?:for\s+)?(\d+\s*(?:days|weeks|months|day|week))\b/i);
      const duration = durationMatch ? durationMatch[1] : "5 days";

      if (cleanName.length >= 2 && !addedNames.has(cleanName.toLowerCase())) {
        matchedMedicines.push({
          name: cleanName,
          strength,
          dosage: lineLower.includes("syr") || lineLower.includes("ml") ? "5 ml" : "1 tablet",
          frequency,
          duration,
          timing,
          route: lineLower.includes("syr") ? "Oral Syrup" : lineLower.includes("inj") ? "Injection" : "Oral",
          instructions: `Take ${timing.toLowerCase()}. Verify exact dosage with your pharmacist.`,
          confidenceScore: 0.85,
          needsVerification: true
        });
        addedNames.add(cleanName.toLowerCase());
      }
    }
  }

  // C. Fallback for prescriptions without explicit line numbers
  if (matchedMedicines.length === 0 && !isNonMedicalDocument) {
    const medWords = lines.filter(l => /\b(tablet|capsule|syrup|injection|mg|ml|dose|rx|take)\b/i.test(l));
    for (const mw of medWords) {
      const clean = mw.replace(/^(rx:?|tab\.?|cap\.?|syr\.?)\s*/i, "").trim();
      if (clean.length > 3 && !addedNames.has(clean.toLowerCase())) {
        matchedMedicines.push({
          name: clean,
          strength: "Needs verification",
          dosage: "1 dose",
          frequency: "Twice daily",
          duration: "5 days",
          timing: "After food",
          route: "Oral",
          instructions: "Extracted from prescription document. Verify with doctor.",
          confidenceScore: 0.7,
          needsVerification: true
        });
        addedNames.add(clean.toLowerCase());
      }
    }
  }

  const additionalInstructions = matchedMedicines.length > 0
    ? "Take medicines as prescribed by your doctor. Contact pharmacist if handwriting is unclear."
    : isNonMedicalDocument
    ? "This document appears to be a bill or receipt. No medicines were detected."
    : "No medicines detected in this image. Please upload a clear medical prescription or doctor note.";

  return {
    doctorName: doctorName || (matchedMedicines.length > 0 ? "Treating Physician" : null),
    prescriptionDate: prescriptionDate || (matchedMedicines.length > 0 ? new Date().toISOString().split("T")[0] : null),
    diagnosis,
    additionalInstructions,
    medicines: matchedMedicines
  };
}
