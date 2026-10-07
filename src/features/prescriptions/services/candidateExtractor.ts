import { COMPREHENSIVE_MEDICINE_DB } from "@/features/medicines/data/medicineDatabase";

export type LineCategory =
  | "MEDICINE"
  | "PATIENT"
  | "DOCTOR"
  | "HOSPITAL"
  | "DATE"
  | "DOSAGE"
  | "INSTRUCTION"
  | "OTHER";

export interface CandidateExtractionResult {
  rawLine: string;
  category: LineCategory;
  rawMedicineText: string | null;
  normalizedMedicineText: string | null;
  form: string | null;
  strength: string | null;
  frequency: string | null;
  duration: string | null;
  timing: string | null;
  route: string | null;
}

const PHARMA_FORMS_REGEX = /\b(tab\.?|tablet|cap\.?|capsule|syrup|syr\.?|susp\.?|suspension|inj\.?|injection|cream|ointment|oint\.?|drops?|gel|lotion|powder|solution|soln\.?|sachet|t\.|c\.)\b/i;

const STRENGTH_REGEX = /\b(\d+(?:\.\d+)?\s*(?:mg|g|gm|mcg|ml|iu|%)(?:\/\d+\s*ml)?|\b(?:650|500|250|100|50|40|20|10|5|625|375|1000|850)\b(?=\s*(?:mg|g|tablet|tab|capsule|cap|1-0-1|bd|od|tid|daily|\s|$)))\b/i;

const FREQUENCY_REGEX = /\b(\d\s*-\s*\d\s*-\s*\d|\d\s*-\s*\d\s*-\s*\d\s*-\s*\d|bd|b\.d\.|tid|t\.i\.d\.|qid|q\.i\.d\.|od|o\.d\.|hs|sos|stat|once daily|twice daily|three times daily|four times daily|as needed)\b/i;

const DURATION_REGEX = /\b(?:for\s+)?(\d+\s*(?:days?|weeks?|months?))\b/i;

const TIMING_REGEX = /\b(after (?:food|meals?)|before (?:food|meals?)|empty stomach|at bedtime|with food|after meals|before meals)\b/i;

const DRUG_SUFFIXES_REGEX = /\b\w+(?:cillin|mycin|thromycin|cycline|zole|prazole|statin|sartan|dipine|fenac|profen|terol|olol|nidazole|tidine|setron|kast|pram|xetine|zepam|zolam)\b/i;

const DOCTOR_REGEX = /\b(dr\.?|doctor|physician|consultant|mbbs|md|ms)\b/i;
const PATIENT_REGEX = /\b(patient|pt\.?|mr\.?|mrs\.?|ms\.?|age|sex|gender)\b/i;
const HOSPITAL_REGEX = /\b(hospital|clinic|nursing home|healthcare|medical center)\b/i;
const DATE_REGEX = /\b(date:?|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/i;

const MOBILE_NOISE_REGEX = /\b(samsung|galaxy|iphone|apple|redmi|xiaomi|poco|realme|vivo|oppo|oneplus|motorola|moto|shot on|ai camera|camscanner)\b/i;

/**
 * Categorizes a single line from the OCR text
 */
export function classifyLine(line: string): LineCategory {
  const trimmed = line.trim();
  if (!trimmed || MOBILE_NOISE_REGEX.test(trimmed)) return "OTHER";

  if (DOCTOR_REGEX.test(trimmed) && !PHARMA_FORMS_REGEX.test(trimmed)) return "DOCTOR";
  if (PATIENT_REGEX.test(trimmed) && !PHARMA_FORMS_REGEX.test(trimmed)) return "PATIENT";
  if (HOSPITAL_REGEX.test(trimmed) && !PHARMA_FORMS_REGEX.test(trimmed)) return "HOSPITAL";
  if (DATE_REGEX.test(trimmed) && !PHARMA_FORMS_REGEX.test(trimmed) && !STRENGTH_REGEX.test(trimmed)) return "DATE";

  const lineLower = trimmed.toLowerCase();

  // 1. Direct match against Database entries
  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    const keywords = [entry.genericName, ...entry.brandNames, ...entry.aliases];
    if (keywords.some((k) => lineLower.includes(k.toLowerCase()))) {
      return "MEDICINE";
    }
  }

  // 2. Drug Suffix Match (e.g. Paracetamol, Azithromycin, Pantoprazole, Aceclofenac)
  if (DRUG_SUFFIXES_REGEX.test(trimmed)) {
    return "MEDICINE";
  }

  const isNumberedMedLine = /^(?:\d+[\.\)]|\-|\*|rx:?)/i.test(trimmed);
  const hasForm = PHARMA_FORMS_REGEX.test(trimmed);
  const hasStrength = STRENGTH_REGEX.test(trimmed);
  const hasFreq = FREQUENCY_REGEX.test(trimmed);

  if (hasForm || isNumberedMedLine || (hasStrength && (hasFreq || trimmed.length < 60))) {
    return "MEDICINE";
  }

  if (hasFreq && !hasStrength && !hasForm) return "DOSAGE";
  if (/\b(drink|rest|water|avoid|take|sip|follow)\b/i.test(trimmed)) return "INSTRUCTION";

  // Fallback: If line contains a number and a word > 3 letters, assume candidate medicine
  if (/\d+/.test(trimmed) && /[a-zA-Z]{4,}/.test(trimmed)) {
    return "MEDICINE";
  }

  return "OTHER";
}

/**
 * Normalizes candidate medicine text for matching
 */
export function normalizeCandidateText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[,\.:;\(\)\[\]\{\}\-\\_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parses a medicine candidate line, separating medicine name from strength, form, frequency, etc.
 */
export function parseCandidateMedicineLine(lineText: string): CandidateExtractionResult {
  const category = classifyLine(lineText);

  if (category !== "MEDICINE") {
    return {
      rawLine: lineText,
      category,
      rawMedicineText: null,
      normalizedMedicineText: null,
      form: null,
      strength: null,
      frequency: null,
      duration: null,
      timing: null,
      route: null
    };
  }

  // 1. Detect Form
  const formMatch = lineText.match(PHARMA_FORMS_REGEX);
  let form: string | null = null;
  if (formMatch) {
    const rawForm = formMatch[1].toLowerCase();
    if (rawForm.startsWith("tab")) form = "Tablet";
    else if (rawForm.startsWith("cap")) form = "Capsule";
    else if (rawForm.startsWith("syr") || rawForm.startsWith("susp")) form = "Syrup";
    else if (rawForm.startsWith("inj")) form = "Injection";
    else if (rawForm.startsWith("drop")) form = "Drops";
    else form = formMatch[1];
  }

  // 2. Detect Strength
  const strengthMatch = lineText.match(STRENGTH_REGEX);
  const strength = strengthMatch ? strengthMatch[1] : null;

  // 3. Detect Frequency
  const freqMatch = lineText.match(FREQUENCY_REGEX);
  let frequency: string | null = null;
  if (freqMatch) {
    const rawF = freqMatch[1].toLowerCase().replace(/\s+/g, "");
    if (rawF === "1-0-1" || rawF === "bd" || rawF === "b.d.") frequency = "1-0-1 (Twice daily)";
    else if (rawF === "1-1-1" || rawF === "tid" || rawF === "t.i.d.") frequency = "1-1-1 (Three times daily)";
    else if (rawF === "1-0-0" || rawF === "od" || rawF === "o.d.") frequency = "1-0-0 (Once daily)";
    else if (rawF === "0-0-1" || rawF === "hs") frequency = "0-0-1 (Once daily at bedtime)";
    else if (rawF === "sos") frequency = "As needed (SOS)";
    else frequency = freqMatch[1];
  }

  // 4. Detect Duration
  const durMatch = lineText.match(DURATION_REGEX);
  const duration = durMatch ? durMatch[1] : null;

  // 5. Detect Timing
  const timingMatch = lineText.match(TIMING_REGEX);
  const timing = timingMatch ? timingMatch[1] : null;

  // 6. Extract Raw Medicine Name by searching DB keywords first
  let cleanName = "";
  const lineLower = lineText.toLowerCase();

  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    const targets = [entry.genericName, ...entry.brandNames, ...entry.aliases];
    const hit = targets.find((t) => lineLower.includes(t.toLowerCase()));
    if (hit) {
      cleanName = hit;
      break;
    }
  }

  if (!cleanName) {
    cleanName = lineText
      .replace(/^(?:\d+[\.\)]|\-|\*|rx:?)\s*/i, "")
      .replace(PHARMA_FORMS_REGEX, "")
      .replace(STRENGTH_REGEX, "")
      .replace(FREQUENCY_REGEX, "")
      .replace(DURATION_REGEX, "")
      .replace(TIMING_REGEX, "")
      .replace(/\b(x|\*|times|days?|weeks?|for|take|after|before|food|meals?)\b/gi, "")
      .replace(/[,\.:;\-\_\/]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const rawMedicineText = cleanName || lineText.trim();
  const normalizedMedicineText = normalizeCandidateText(rawMedicineText);

  return {
    rawLine: lineText,
    category: "MEDICINE",
    rawMedicineText,
    normalizedMedicineText,
    form: form || "Tablet",
    strength: strength || null,
    frequency: frequency || "As prescribed",
    duration: duration || "5 days",
    timing: timing || "After food",
    route: form === "Syrup" ? "Oral Syrup" : form === "Injection" ? "Injection" : "Oral"
  };
}
