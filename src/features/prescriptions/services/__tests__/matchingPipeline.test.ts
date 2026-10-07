import { describe, it, expect } from "vitest";
import { parseCandidateMedicineLine, classifyLine } from "../candidateExtractor";
import { matchCandidateToDatabase } from "../matchingPipeline";

describe("Prescription Medicine Extraction & Matching Pipeline", () => {
  it("Test 1: Exact match for Azithromycin", () => {
    const cand = parseCandidateMedicineLine("Tab. Azithromycin 500 mg");
    const result = matchCandidateToDatabase(cand, 0.95);

    expect(result.medicineRaw).toBe("Azithromycin");
    expect(result.medicineNormalized).toBe("Azithromycin");
    expect(result.matchType).toBe("exact");
    expect(result.overallConfidence).toBeGreaterThanOrEqual(0.90);
    expect(result.status).toBe("verified_candidate");
  });

  it("Test 2: Alias match for Azithro", () => {
    const cand = parseCandidateMedicineLine("Tab. Azithro 500 mg");
    const result = matchCandidateToDatabase(cand, 0.95);

    expect(result.medicineRaw).toBe("Azithro");
    expect(result.medicineNormalized).toBe("Azithromycin");
    expect(result.matchType).toBe("alias");
    expect(result.overallConfidence).toBeGreaterThanOrEqual(0.90);
  });

  it("Test 3: Fuzzy match for misspelled OCR Azithr0", () => {
    const cand = parseCandidateMedicineLine("Tab. Azithr0 500 mg");
    const result = matchCandidateToDatabase(cand, 0.90);

    expect(result.medicineRaw).toBe("Azithr0");
    expect(result.medicineNormalized).toBe("Azithromycin");
    expect(result.matchType).toBe("fuzzy");
    expect(result.overallConfidence).toBeLessThan(0.95);
  });

  it("Test 4: Completely unknown medicine string returns UNKNOWN / uncertain status", () => {
    const cand = parseCandidateMedicineLine("Tab. Xyzabc123 500 mg");
    const result = matchCandidateToDatabase(cand, 0.90);

    expect(result.medicineRaw).toBe("Xyzabc123");
    expect(result.medicineNormalized).toBeNull();
    expect(result.matchType).toBe("none");
    expect(result.status).toBe("uncertain");
    expect(result.requiresConfirmation).toBe(true);
  });

  it("Test 5: Doctor name classified as DOCTOR and NOT_MEDICINE", () => {
    const category = classifyLine("Dr. Azith Kumar");
    const cand = parseCandidateMedicineLine("Dr. Azith Kumar");
    const result = matchCandidateToDatabase(cand, 0.90);

    expect(category).toBe("DOCTOR");
    expect(result.medicineNormalized).toBeNull();
    expect(result.status).toBe("uncertain");
  });

  it("Test 6: Patient name classified as PATIENT and NOT_MEDICINE", () => {
    const category = classifyLine("Patient: Rahul Kumar");
    const cand = parseCandidateMedicineLine("Patient: Rahul Kumar");
    const result = matchCandidateToDatabase(cand, 0.90);

    expect(category).toBe("PATIENT");
    expect(result.medicineNormalized).toBeNull();
  });

  it("Test 7: Dosage only classified as DOSAGE and NOT_MEDICINE", () => {
    const category = classifyLine("1-0-1");
    const cand = parseCandidateMedicineLine("1-0-1");

    expect(category).toBe("DOSAGE");
    expect(cand.category).not.toBe("MEDICINE");
  });

  it("Test 8: Brand PCM + strength separates raw = PCM, normalized = Paracetamol, strength = 650 mg", () => {
    const cand = parseCandidateMedicineLine("Tab. PCM 650 mg 1-0-1");
    const result = matchCandidateToDatabase(cand, 0.95);

    expect(result.medicineRaw).toBe("PCM");
    expect(result.medicineNormalized).toBe("Paracetamol");
    expect(result.strength).toBe("650 mg");
    expect(result.matchType).toBe("alias");
  });
});
