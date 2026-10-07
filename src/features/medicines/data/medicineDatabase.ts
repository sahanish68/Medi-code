export interface MedicineDbEntry {
  id: string;
  genericName: string;
  brandNames: string[];
  aliases: string[];
  dosageForms: string[];
  strengths: string[];
  manufacturer?: string;
  ingredients: string[];
  uses: string;
  sideEffects: string[];
  seriousWarnings: string[];
  warnings: string[];
}

export interface MedicineDbEntry {
  id: string;
  genericName: string;
  brandNames: string[];
  aliases: string[];
  dosageForms: string[];
  strengths: string[];
  manufacturer?: string;
  ingredients: string[];
  uses: string;
  sideEffects: string[];
  seriousWarnings: string[];
  warnings: string[];
}

export const COMPREHENSIVE_MEDICINE_DB: MedicineDbEntry[] = [
  {
    id: "med-paracetamol",
    genericName: "Paracetamol",
    brandNames: ["Dolo", "Crocin", "Calpol", "Pacimol", "PCM", "Tylenol", "Panadol", "Paracip", "Febrex"],
    aliases: ["PCM", "Dolo 650", "Dolo650", "Crocin 500", "Calpol 500", "Paracet", "Paracip 650", "Paracetamol 650mg", "Paracetamol 500mg"],
    dosageForms: ["Tablet", "Syrup", "Injection", "Drops"],
    strengths: ["500 mg", "650 mg", "120 mg/5ml", "250 mg/5ml"],
    manufacturer: "Micro Labs / GlaxoSmithKline / Various",
    ingredients: ["Paracetamol (Acetaminophen)"],
    uses: "Commonly used to relieve mild to moderate pain (headache, body ache) and bring down fever.",
    sideEffects: ["Mild nausea", "Stomach upset if taken on an empty stomach"],
    seriousWarnings: [
      "Severe liver toxicity if maximum daily dose (4000 mg) is exceeded",
      "Skin rash or sudden allergic swelling (seek emergency care)"
    ],
    warnings: [
      "Never take multiple medicines containing Paracetamol at the same time",
      "Avoid alcohol while taking this medicine",
      "Consult doctor if fever lasts longer than 3 days"
    ]
  },
  {
    id: "med-azithromycin",
    genericName: "Azithromycin",
    brandNames: ["Azithral", "Azee", "Zady", "Azithro", "Azitop", "Azithrocin", "Zithromax"],
    aliases: ["Azithro", "Azithro 500", "Azithral 500", "Azee 500", "Azithrocin 500", "Azithromycin 500mg"],
    dosageForms: ["Tablet", "Capsule", "Suspension", "Injection"],
    strengths: ["250 mg", "500 mg", "100 mg/5ml", "200 mg/5ml"],
    manufacturer: "Alembic / Cipla / Pfizer",
    ingredients: ["Azithromycin Dihydrate"],
    uses: "Used for treating bacterial infections of the respiratory tract, throat, ear, and skin.",
    sideEffects: ["Mild stomach cramps", "Nausea", "Mild loss of appetite"],
    seriousWarnings: [
      "Irregular heart rhythm (QT prolongation warning)",
      "Severe persistent vomiting or diarrhea"
    ],
    warnings: [
      "Finish the entire 3 or 5-day course as instructed",
      "Do not take simultaneously with antacids"
    ]
  },
  {
    id: "med-amoxicillin-clavulanate",
    genericName: "Amoxicillin and Potassium Clavulanate",
    brandNames: ["Augmentin", "Moxikind-CV", "Clavam", "Mox", "Amoxyclav", "Advent", "Moxikind"],
    aliases: ["Augmentin 625", "Augmentin625", "Clavam 625", "Clavam625", "Mox 500", "Amox 500", "Amoxicillin 500mg", "Moxikind CV 625"],
    dosageForms: ["Tablet", "Syrup", "Injection"],
    strengths: ["375 mg", "625 mg", "1000 mg", "228.5 mg/5ml"],
    manufacturer: "GSK / Alkem / Mankind",
    ingredients: ["Amoxicillin Trihydrate", "Potassium Clavulanate"],
    uses: "Broad-spectrum antibiotic used to treat chest, lung, ear, sinus, skin, and urinary tract infections.",
    sideEffects: ["Diarrhea", "Nausea", "Vomiting", "Skin rash"],
    seriousWarnings: [
      "Severe watery diarrhea with stomach cramps (C. difficile warning)",
      "Anaphylaxis allergic reaction"
    ],
    warnings: [
      "Complete the entire prescribed course",
      "Inform doctor if you have penicillin allergy"
    ]
  },
  {
    id: "med-pantoprazole",
    genericName: "Pantoprazole",
    brandNames: ["Pan-40", "Pantocid", "Pantodac", "Pantop", "Pan 40", "Pan-D", "Pantoloc"],
    aliases: ["Pan 40", "Pan-40", "Pan40", "Pantocid 40", "Pantop 40", "Pantoprazole 40mg", "Pan D"],
    dosageForms: ["Tablet", "Injection", "Capsule"],
    strengths: ["20 mg", "40 mg"],
    manufacturer: "Alkem / Sun Pharma / Cipla",
    ingredients: ["Pantoprazole Sodium"],
    uses: "Reduces stomach acid production. Used for GERD, acidity, heartburn, and stomach ulcers.",
    sideEffects: ["Headache", "Flatulence", "Mild constipation"],
    seriousWarnings: [
      "Long-term high-dose use may increase risk of bone fractures",
      "Severe magnesium deficiency"
    ],
    warnings: [
      "Swallow whole, 30-60 mins before breakfast",
      "Do not chew or crush tablet"
    ]
  },
  {
    id: "med-cetirizine",
    genericName: "Cetirizine",
    brandNames: ["Cetzine", "Alerid", "Okacet", "Zyrtec", "Cetrifos", "Alatrol"],
    aliases: ["Cetzine 10", "Alerid 10", "Okacet 10", "Cetirizine 10mg", "Cetzine"],
    dosageForms: ["Tablet", "Syrup"],
    strengths: ["5 mg", "10 mg", "5 mg/5ml"],
    manufacturer: "Dr. Reddy's / Cipla",
    ingredients: ["Cetirizine Hydrochloride"],
    uses: "Antihistamine for allergy relief (sneezing, runny nose, watery eyes, itching).",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    seriousWarnings: ["Severe urinary retention in elderly"],
    warnings: [
      "May cause sleepiness; avoid driving or heavy machinery",
      "Avoid alcohol while taking"
    ]
  },
  {
    id: "med-levocetirizine-montelukast",
    genericName: "Levocetirizine and Montelukast",
    brandNames: ["Montair-LC", "Telekast-L", "Montek-LC", "Monticope", "Romilast-L"],
    aliases: ["Montair LC", "MontairLC", "Montek LC", "Telekast L", "Montelukast Levocetirizine"],
    dosageForms: ["Tablet", "Syrup"],
    strengths: ["5 mg + 10 mg"],
    manufacturer: "Cipla / Sun Pharma / Lupin",
    ingredients: ["Levocetirizine Dihydrochloride", "Montelukast Sodium"],
    uses: "Used for allergic rhinitis, asthma prevention, chronic hives, and seasonal allergies.",
    sideEffects: ["Headache", "Sleepiness", "Mild dry mouth"],
    seriousWarnings: ["Rare mood or behavior changes (neuropsychiatric events)"],
    warnings: ["Take once daily in the evening at bedtime"]
  },
  {
    id: "med-metformin",
    genericName: "Metformin",
    brandNames: ["Glycomet", "Gluformin", "Obimet", "Riomet", "Glucophage"],
    aliases: ["Glycomet 500", "Glycomet 850", "Glycomet 1000", "Metformin 500", "Metformin 850mg"],
    dosageForms: ["Tablet", "Extended Release Tablet"],
    strengths: ["500 mg", "850 mg", "1000 mg"],
    manufacturer: "USV / Sun Pharma / Torrent",
    ingredients: ["Metformin Hydrochloride"],
    uses: "Lowers blood glucose levels in Type 2 Diabetes by improving insulin sensitivity.",
    sideEffects: ["Nausea", "Abdominal discomfort", "Metallic taste"],
    seriousWarnings: ["Lactic acidosis (rare but severe)"],
    warnings: [
      "Take with or immediately after meals",
      "Monitor blood sugar regularly"
    ]
  },
  {
    id: "med-atorvastatin",
    genericName: "Atorvastatin",
    brandNames: ["Storvas", "Atorva", "Lipikind", "Lipitor", "Atocor", "Atorlip"],
    aliases: ["Storvas 10", "Atorva 10", "Atorvastatin 10mg", "Atorvastatin 20mg", "Lipitor 10"],
    dosageForms: ["Tablet"],
    strengths: ["5 mg", "10 mg", "20 mg", "40 mg", "80 mg"],
    manufacturer: "Sun Pharma / Ranbaxy / Pfizer",
    ingredients: ["Atorvastatin Calcium"],
    uses: "Lowers cholesterol and triglycerides to reduce heart attack and stroke risk.",
    sideEffects: ["Joint pain", "Mild digestive changes", "Headache"],
    seriousWarnings: [
      "Unexplained severe muscle pain/weakness (rhabdomyolysis)",
      "Liver enzyme elevation"
    ],
    warnings: [
      "Report unexplained muscle pain immediately",
      "Avoid excessive grapefruit juice"
    ]
  },
  {
    id: "med-telmisartan",
    genericName: "Telmisartan",
    brandNames: ["Telma", "Tazloc", "Telpres", "Micardis", "Telvas", "Telsartan"],
    aliases: ["Telma 40", "Telma 20", "Tazloc 40", "Telpres 40", "Telmisartan 40mg", "Telma H"],
    dosageForms: ["Tablet"],
    strengths: ["20 mg", "40 mg", "80 mg"],
    manufacturer: "Glenmark / Torrent / Lupin",
    ingredients: ["Telmisartan"],
    uses: "Manages high blood pressure (hypertension) and protects kidney function.",
    sideEffects: ["Dizziness", "Back pain", "Sinusitis"],
    seriousWarnings: ["Fetal toxicity (do not take during pregnancy)"],
    warnings: ["Monitor blood pressure and serum potassium regularly"]
  },
  {
    id: "med-aceclofenac-paracetamol",
    genericName: "Aceclofenac and Paracetamol",
    brandNames: ["Zerodol-P", "Hifenac-P", "Dolowin-Plus", "Aceclo-Plus", "Zerodol-SP"],
    aliases: ["Zerodol P", "Zerodol-P", "ZerodolP", "Hifenac P", "Zerodol", "Aceclo P", "Zerodol SP"],
    dosageForms: ["Tablet"],
    strengths: ["100 mg + 325 mg", "100 mg + 500 mg"],
    manufacturer: "Ipca / Intas / Mankind",
    ingredients: ["Aceclofenac", "Paracetamol"],
    uses: "Relieves pain and inflammation in joint pain, rheumatoid arthritis, osteoarthritis, and dental pain.",
    sideEffects: ["Stomach upset", "Nausea", "Dizziness"],
    seriousWarnings: ["Gastrointestinal bleeding warning with NSAID overuse"],
    warnings: ["Take after food with plenty of water"]
  },
  {
    id: "med-ibuprofen-paracetamol",
    genericName: "Ibuprofen and Paracetamol",
    brandNames: ["Combiflam", "Flexon", "Ibugesic-Plus", "Brufen"],
    aliases: ["Combiflam", "Flexon", "Ibugesic Plus", "Ibuprofen 400mg", "Combiflam Tablet"],
    dosageForms: ["Tablet", "Syrup"],
    strengths: ["400 mg + 325 mg"],
    manufacturer: "Sanofi / Aristo / Abbott",
    ingredients: ["Ibuprofen", "Paracetamol"],
    uses: "Relieves acute pain, headache, fever, muscle aches, and inflammatory swelling.",
    sideEffects: ["Heartburn", "Stomach irritation", "Nausea"],
    seriousWarnings: ["Stomach ulceration with prolonged use"],
    warnings: ["Always take after meals"]
  },
  {
    id: "med-rabeprazole",
    genericName: "Rabeprazole",
    brandNames: ["Rabeloc", "Cyra", "Razo", "Rabium", "Parit", "Rabekind"],
    aliases: ["Cyra 20", "Razo 20", "Rabeloc 20", "Rabeprazole 20mg", "Rabium 20"],
    dosageForms: ["Tablet", "Capsule"],
    strengths: ["10 mg", "20 mg"],
    manufacturer: "Cadila / Intas / Cipla",
    ingredients: ["Rabeprazole Sodium"],
    uses: "Proton pump inhibitor for hyperacidity, GERD, and peptic ulcers.",
    sideEffects: ["Diarrhea", "Headache", "Flatulence"],
    seriousWarnings: ["Severe Vitamin B12 deficiency with long term use"],
    warnings: ["Take on empty stomach 30 mins before food"]
  },
  {
    id: "med-ciprofloxacin",
    genericName: "Ciprofloxacin",
    brandNames: ["Cifran", "Ciplox", "Ciprolo", "Cipro", "Cifran-500"],
    aliases: ["Cifran 500", "Cifran500", "Ciplox 500", "Cipro 500", "Ciprofloxacin 500mg"],
    dosageForms: ["Tablet", "Eye/Ear Drops", "Infusion"],
    strengths: ["250 mg", "500 mg", "750 mg"],
    manufacturer: "Ranbaxy / Cipla / Sun Pharma",
    ingredients: ["Ciprofloxacin Hydrochloride"],
    uses: "Fluoroquinolone antibiotic for urinary tract, chest, skin, and joint infections.",
    sideEffects: ["Nausea", "Diarrhea", "Headache"],
    seriousWarnings: ["Tendonitis and tendon rupture warning"],
    warnings: ["Avoid dairy products or antacids 2 hours before/after taking"]
  },
  {
    id: "med-ondansetron",
    genericName: "Ondansetron",
    brandNames: ["Vomikind", "Emeset", "Ondem", "Zofran"],
    aliases: ["Vomikind 4", "Emeset 4", "Ondem 4", "Ondansetron 4mg"],
    dosageForms: ["Tablet", "Syrup", "Injection"],
    strengths: ["4 mg", "8 mg"],
    manufacturer: "Mankind / Cipla / Alkem",
    ingredients: ["Ondansetron Hydrochloride"],
    uses: "Prevents nausea and vomiting caused by stomach bugs, motion sickness, surgery, or medical treatments.",
    sideEffects: ["Headache", "Constipation", "Feeling warm"],
    seriousWarnings: ["Serotonin syndrome risk if taken with antidepressant drugs"],
    warnings: ["Take 30 mins before food or travel"]
  },
  {
    id: "med-metronidazole",
    genericName: "Metronidazole",
    brandNames: ["Metrogyl", "Flagyl", "Aldazide"],
    aliases: ["Metrogyl 400", "Flagyl 400", "Metrogyl 200", "Metronidazole 400mg"],
    dosageForms: ["Tablet", "Suspension", "Infusion"],
    strengths: ["200 mg", "400 mg"],
    manufacturer: "Unique / Sanofi",
    ingredients: ["Metronidazole"],
    uses: "Antiprotozoal and antibacterial agent for stomach infections, amebiasis, dental infections, and diarrhea.",
    sideEffects: ["Metallic taste", "Dark urine", "Loss of appetite"],
    seriousWarnings: ["Severe disulfiram-like reaction with alcohol"],
    warnings: ["Strictly avoid alcohol during and 48h after completing treatment"]
  }
];

