import type { MedicineAlternative } from "../types/alternative.types";
import { generateId } from "@/lib/utils/id";

export interface DrugAlternativeCatalogItem {
  activeIngredient: string;
  strength: string;
  dosageForm: string;
  brandEquivalents: {
    name: string;
    manufacturer: string;
    isJanAushadhi: boolean;
    priceRatio: string;
  }[];
}

export const INDIAN_GENERIC_CATALOG: DrugAlternativeCatalogItem[] = [
  {
    activeIngredient: "Paracetamol",
    strength: "650 mg",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Paracetamol 650mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "70-80% lower cost" },
      { name: "Dolo 650", manufacturer: "Micro Labs Ltd", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Crocin 650 Advance", manufacturer: "GlaxoSmithKline", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Calpol 650", manufacturer: "GSK Pharmaceuticals", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Pacimol 650", manufacturer: "Ipca Laboratories", isJanAushadhi: false, priceRatio: "30% lower cost" }
    ]
  },
  {
    activeIngredient: "Paracetamol",
    strength: "500 mg",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Paracetamol 500mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "75-85% lower cost" },
      { name: "Crocin 500", manufacturer: "GlaxoSmithKline", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "P-500", manufacturer: "Apex Laboratories", isJanAushadhi: false, priceRatio: "30% lower cost" },
      { name: "Pyrigesic 500", manufacturer: "East India Pharma", isJanAushadhi: false, priceRatio: "35% lower cost" }
    ]
  },
  {
    activeIngredient: "Amoxicillin and Potassium Clavulanate",
    strength: "625 mg (500mg + 125mg)",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Amoxyclav 625mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "65-75% lower cost" },
      { name: "Augmentin 625 Duo", manufacturer: "GlaxoSmithKline", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Moxikind-CV 625", manufacturer: "Mankind Pharma", isJanAushadhi: false, priceRatio: "35% lower cost" },
      { name: "Clavam 625", manufacturer: "Alkem Laboratories", isJanAushadhi: false, priceRatio: "25% lower cost" },
      { name: "Novamox CV 625", manufacturer: "Cipla Ltd", isJanAushadhi: false, priceRatio: "20% lower cost" }
    ]
  },
  {
    activeIngredient: "Pantoprazole",
    strength: "40 mg",
    dosageForm: "Gastro-resistant Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Pantoprazole 40mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "70-80% lower cost" },
      { name: "Pan 40", manufacturer: "Alkem Laboratories", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Pantocid 40", manufacturer: "Sun Pharma", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Pantodac 40", manufacturer: "Zydus Cadila", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Pantosec 40", manufacturer: "Cipla Ltd", isJanAushadhi: false, priceRatio: "25% lower cost" }
    ]
  },
  {
    activeIngredient: "Cetirizine Hydrochloride",
    strength: "10 mg",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Cetirizine 10mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "80% lower cost" },
      { name: "Cetzine 10mg", manufacturer: "Dr. Reddy's Laboratories", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Alerid 10mg", manufacturer: "Cipla Ltd", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Okacet 10mg", manufacturer: "Cipla Ltd", isJanAushadhi: false, priceRatio: "Standard brand" }
    ]
  },
  {
    activeIngredient: "Metformin Hydrochloride",
    strength: "500 mg",
    dosageForm: "Sustained Release Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Metformin SR 500mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "75-80% lower cost" },
      { name: "Glycomet 500 SR", manufacturer: "USV Ltd", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Gluformin 500", manufacturer: "Abbott Healthcare", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Obimet 500 SR", manufacturer: "Torrent Pharmaceuticals", isJanAushadhi: false, priceRatio: "25% lower cost" }
    ]
  },
  {
    activeIngredient: "Azithromycin",
    strength: "500 mg",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Azithromycin 500mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "60-70% lower cost" },
      { name: "Azithral 500", manufacturer: "Alembic Pharmaceuticals", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Azee 500", manufacturer: "Cipla Ltd", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Zady 500", manufacturer: "Mankind Pharma", isJanAushadhi: false, priceRatio: "30% lower cost" }
    ]
  },
  {
    activeIngredient: "Atorvastatin Calcium",
    strength: "10 mg",
    dosageForm: "Tablet",
    brandEquivalents: [
      { name: "Jan Aushadhi Atorvastatin 10mg", manufacturer: "BPPI (Govt of India)", isJanAushadhi: true, priceRatio: "70-80% lower cost" },
      { name: "Atorva 10", manufacturer: "Zydus Cadila", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Storvas 10", manufacturer: "Sun Pharma", isJanAushadhi: false, priceRatio: "Standard brand" },
      { name: "Lipikind 10", manufacturer: "Mankind Pharma", isJanAushadhi: false, priceRatio: "40% lower cost" }
    ]
  }
];

export function findMedicineAlternatives(
  medicineName: string,
  medicineId: string
): MedicineAlternative[] {
  const query = medicineName.toLowerCase();

  const match = INDIAN_GENERIC_CATALOG.find((item) => {
    const ingredientMatch = item.activeIngredient.toLowerCase().includes(query);
    const brandMatch = item.brandEquivalents.some((b) =>
      query.includes(b.name.toLowerCase().split(" ")[0]) ||
      b.name.toLowerCase().includes(query.split(" ")[0])
    );
    return ingredientMatch || brandMatch;
  });

  if (!match) return [];

  return match.brandEquivalents
    .filter((b) => !b.name.toLowerCase().includes(query))
    .slice(0, 4)
    .map((b) => ({
      id: generateId(),
      medicineId,
      prescribedMedicineName: medicineName,
      alternativeName: b.name,
      activeIngredient: match.activeIngredient,
      strength: match.strength,
      dosageForm: match.dosageForm,
      manufacturer: b.manufacturer,
      isJanAushadhiGeneric: b.isJanAushadhi,
      approximatePriceRatio: b.priceRatio,
      source: b.isJanAushadhi ? "PMBJP Govt Central Database" : "Indian National Formulary / CDSCO",
      confidenceScore: 0.95,
      verificationRequired: true
    }));
}

export async function getAlternativesForMedicine(medicineId: string, medicineName: string = "Paracetamol"): Promise<MedicineAlternative[]> {
  return findMedicineAlternatives(medicineName, medicineId);
}
