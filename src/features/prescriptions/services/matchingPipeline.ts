import { COMPREHENSIVE_MEDICINE_DB, MedicineDbEntry } from "@/features/medicines/data/medicineDatabase";
import { normalizeCandidateText, CandidateExtractionResult } from "./candidateExtractor";

export type MatchType = "exact" | "alias" | "normalized" | "fuzzy" | "semantic" | "none";
export type DecisionStatus = "verified_candidate" | "review" | "uncertain";

export interface MatchCandidateAlternative {
  name: string;
  genericName: string;
  score: number;
  dbEntry: MedicineDbEntry;
}

export interface MatchedMedicineResult {
  rawLine: string;
  medicineRaw: string;
  medicineNormalized: string | null;
  dosageForm: string | null;
  strength: string | null;
  frequency: string | null;
  duration: string | null;
  timing: string | null;
  route: string | null;
  ocrConfidence: number;
  matchConfidence: number;
  overallConfidence: number;
  matchType: MatchType;
  status: DecisionStatus;
  requiresConfirmation: boolean;
  dbMatch: MedicineDbEntry | null;
  alternatives: MatchCandidateAlternative[];
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function calculateSimilarity(str1: string, str2: string): number {
  const norm1 = normalizeCandidateText(str1);
  const norm2 = normalizeCandidateText(str2);

  if (norm1 === norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;

  const maxLen = Math.max(norm1.length, norm2.length);
  if (maxLen === 0) return 1.0;

  const dist = levenshteinDistance(norm1, norm2);
  return Math.max(0, 1 - dist / maxLen);
}

export function matchCandidateToDatabase(
  candidate: CandidateExtractionResult,
  ocrConfidence: number = 0.90
): MatchedMedicineResult {
  const rawText = candidate.rawMedicineText || "";
  const normCandidate = candidate.normalizedMedicineText || "";

  if (!rawText || candidate.category !== "MEDICINE") {
    return {
      rawLine: candidate.rawLine,
      medicineRaw: rawText || "NOT_MEDICINE",
      medicineNormalized: null,
      dosageForm: candidate.form,
      strength: candidate.strength,
      frequency: candidate.frequency,
      duration: candidate.duration,
      timing: candidate.timing,
      route: candidate.route,
      ocrConfidence: 0,
      matchConfidence: 0,
      overallConfidence: 0,
      matchType: "none",
      status: "uncertain",
      requiresConfirmation: true,
      dbMatch: null,
      alternatives: []
    };
  }

  // --- STAGE 1: Exact Match (Generic Name) ---
  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    if (entry.genericName.toLowerCase() === rawText.toLowerCase()) {
      return buildResult({
        candidate,
        ocrConfidence,
        matchConfidence: 1.0,
        matchType: "exact",
        dbMatch: entry,
        alternatives: []
      });
    }
  }

  // --- STAGE 2: Alias & Brand Name Match ---
  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    const isBrand = entry.brandNames.some((b) => b.toLowerCase() === rawText.toLowerCase());
    const isAlias = entry.aliases.some((a) => a.toLowerCase() === rawText.toLowerCase());

    if (isBrand || isAlias) {
      return buildResult({
        candidate,
        ocrConfidence,
        matchConfidence: 0.98,
        matchType: "alias",
        dbMatch: entry,
        alternatives: []
      });
    }
  }

  // --- STAGE 3: Token & Substring Overlap Match ---
  const candTokens = normCandidate.split(/\s+/).filter((t) => t.length >= 3);
  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    const allKeywords = [entry.genericName, ...entry.brandNames, ...entry.aliases];
    for (const kw of allKeywords) {
      const normKw = normalizeCandidateText(kw);
      if (!normKw) continue;

      const kwTokens = normKw.split(/\s+/).filter((t) => t.length >= 3);

      if (
        normCandidate.includes(normKw) ||
        normKw.includes(normCandidate) ||
        candTokens.some((t) => normKw === t || (t.length >= 4 && normKw.includes(t))) ||
        kwTokens.some((t) => normCandidate === t || (t.length >= 4 && normCandidate.includes(t)))
      ) {
        return buildResult({
          candidate,
          ocrConfidence,
          matchConfidence: 0.95,
          matchType: "normalized",
          dbMatch: entry,
          alternatives: []
        });
      }
    }
  }

  // --- STAGE 4: Fuzzy Matching ---
  const scoredEntries: { entry: MedicineDbEntry; maxScore: number; matchedTarget: string }[] = [];

  for (const entry of COMPREHENSIVE_MEDICINE_DB) {
    const targets = [entry.genericName, ...entry.brandNames, ...entry.aliases];
    let maxSim = 0;
    let matchedTarget = entry.genericName;

    for (const target of targets) {
      const sim = calculateSimilarity(normCandidate, target);
      if (sim > maxSim) {
        maxSim = sim;
        matchedTarget = target;
      }
    }

    if (maxSim >= 0.4) {
      scoredEntries.push({ entry, maxScore: maxSim, matchedTarget });
    }
  }

  scoredEntries.sort((a, b) => b.maxScore - a.maxScore);

  if (scoredEntries.length > 0 && scoredEntries[0].maxScore >= 0.5) {
    const best = scoredEntries[0];
    const alternatives: MatchCandidateAlternative[] = scoredEntries.slice(1, 4).map((s) => ({
      name: s.matchedTarget,
      genericName: s.entry.genericName,
      score: Math.round(s.maxScore * 100) / 100,
      dbEntry: s.entry
    }));

    return buildResult({
      candidate,
      ocrConfidence,
      matchConfidence: Math.min(0.95, Math.round((best.maxScore + 0.3) * 100) / 100),
      matchType: "fuzzy",
      dbMatch: best.entry,
      alternatives
    });
  }

  // No confident match in database -> UNKNOWN
  return {
    rawLine: candidate.rawLine,
    medicineRaw: rawText,
    medicineNormalized: null,
    dosageForm: candidate.form,
    strength: candidate.strength,
    frequency: candidate.frequency,
    duration: candidate.duration,
    timing: candidate.timing,
    route: candidate.route,
    ocrConfidence,
    matchConfidence: 0,
    overallConfidence: Math.round(ocrConfidence * 0.4 * 100) / 100,
    matchType: "none",
    status: "uncertain",
    requiresConfirmation: true,
    dbMatch: null,
    alternatives: []
  };
}

function buildResult(params: {
  candidate: CandidateExtractionResult;
  ocrConfidence: number;
  matchConfidence: number;
  matchType: MatchType;
  dbMatch: MedicineDbEntry;
  alternatives: MatchCandidateAlternative[];
}): MatchedMedicineResult {
  const { candidate, ocrConfidence, matchConfidence, matchType, dbMatch, alternatives } = params;

  let strengthBonus = 0;
  if (candidate.strength && dbMatch.strengths.some((s) => s.includes(candidate.strength!))) {
    strengthBonus = 0.05;
  }

  let formBonus = 0;
  if (candidate.form && dbMatch.dosageForms.some((f) => f.toLowerCase().includes(candidate.form!.toLowerCase()))) {
    formBonus = 0.05;
  }

  const overallScore = Math.min(
    1.0,
    Math.round((ocrConfidence * 0.35 + matchConfidence * 0.55 + strengthBonus + formBonus) * 100) / 100
  );

  let status: DecisionStatus = "uncertain";
  let requiresConfirmation = true;

  if (overallScore >= 0.75) {
    status = "verified_candidate";
    requiresConfirmation = false;
  } else if (overallScore >= 0.55) {
    status = "review";
    requiresConfirmation = false;
  } else {
    status = "uncertain";
    requiresConfirmation = true;
  }

  return {
    rawLine: candidate.rawLine,
    medicineRaw: candidate.rawMedicineText || dbMatch.genericName,
    medicineNormalized: dbMatch.genericName,
    dosageForm: candidate.form || dbMatch.dosageForms[0] || "Tablet",
    strength: candidate.strength || dbMatch.strengths[0] || "Standard dose",
    frequency: candidate.frequency || "As prescribed",
    duration: candidate.duration || "5 days",
    timing: candidate.timing || "After food",
    route: candidate.route || "Oral",
    ocrConfidence,
    matchConfidence,
    overallConfidence: overallScore,
    matchType,
    status,
    requiresConfirmation,
    dbMatch,
    alternatives
  };
}
