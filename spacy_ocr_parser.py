import os
import re
import sys
import json
from PIL import Image
import pytesseract
import spacy
from spacy.pipeline import EntityRuler

def create_spacy_medical_nlp():
    """
    Step 2: Initialize & Load the Pipeline with Custom Medical Entity Rules
    """
    # 1. Load pre-trained English model (small, fast)
    # Disable parser if not required to optimize speed
    nlp = spacy.load("en_core_web_sm", disable=["parser"])

    # 2. Add custom EntityRuler to spaCy pipeline for medical recognition
    ruler = nlp.add_pipe("entity_ruler", before="ner")
    
    patterns = [
        # Common Medicines
        {"label": "MEDICINE", "pattern": [{"LOWER": {"IN": ["paracetamol", "amoxicillin", "ibuprofen", "metformin", "aspirin", "atorvastatin", "omeprazole", "azithromycin", "ciprofloxacin", "pantoprazole", "cetirizine", "dexamethasone"]}}]},
        
        # Dosage / Strength (e.g., 500mg, 500 mg, 10ml, 5 ml)
        {"label": "DOSAGE", "pattern": [{"LIKE_NUM": True}, {"LOWER": {"IN": ["mg", "g", "ml", "mcg", "tablets", "capsules", "tabs", "caps"]}}]},
        {"label": "DOSAGE", "pattern": [{"TEXT": {"REGEX": r"^\d+(?:mg|g|ml|mcg)$"}}]},

        # Frequency (e.g., twice daily, 1-0-1, every 8 hours, BD, TID, QID)
        {"label": "FREQUENCY", "pattern": [{"LOWER": "twice"}, {"LOWER": "daily"}]},
        {"label": "FREQUENCY", "pattern": [{"LOWER": "once"}, {"LOWER": "daily"}]},
        {"label": "FREQUENCY", "pattern": [{"LOWER": "three"}, {"LOWER": "times"}, {"LOWER": "a"}, {"LOWER": "day"}]},
        {"label": "FREQUENCY", "pattern": [{"TEXT": {"REGEX": r"^\d-\d-\d$"}}]},
        {"label": "FREQUENCY", "pattern": [{"LOWER": {"IN": ["bd", "tid", "qid", "od", "hs"]}}]},
        
        # Duration (e.g., for 5 days, 1 week, 10 days)
        {"label": "DURATION", "pattern": [{"LOWER": "for"}, {"LIKE_NUM": True}, {"LOWER": {"IN": ["days", "weeks", "months", "day", "week"]}}]},
        {"label": "DURATION", "pattern": [{"LIKE_NUM": True}, {"LOWER": {"IN": ["days", "weeks", "months", "day", "week"]}}]},

        # Timing (e.g., after food, before meals, at bedtime)
        {"label": "TIMING", "pattern": [{"LOWER": {"IN": ["after", "before"]}}, {"LOWER": {"IN": ["food", "meal", "meals", "eating"]}}]},
        {"label": "TIMING", "pattern": [{"LOWER": "at"}, {"LOWER": "bedtime"}]}
    ]
    
    ruler.add_patterns(patterns)
    return nlp

def extract_text_from_image(image_path: str) -> str:
    """
    Step 3 (OCR Component): Read text from image using Tesseract OCR
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")
        
    image = Image.open(image_path)
    # Extract raw text from image using pytesseract
    raw_text = pytesseract.image_to_string(image)
    return raw_text

def process_prescription_text(nlp, text: str):
    """
    Step 3 & 4 (spaCy Core Logic & Data Extraction):
    Process raw OCR text using spaCy pipeline to extract structured medicine details.
    """
    # Create structured Doc object
    doc = nlp(text)

    # 1. Tokenization & Cleaned words (filter stop words and punctuation)
    clean_tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]

    # 2. Extract POS Tagging
    pos_tags = [(token.text, token.pos_) for token in doc if not token.is_stop]

    # 3. Extract Lemmatization
    lemmas = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]

    # 4. Extract Named Entities (Entities extracted by spaCy NER & EntityRuler)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]

    # 5. Extract structured Medicine & Dosage information
    medicines = []
    current_med = None

    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        line_doc = nlp(line)
        med_entities = {ent.label_: ent.text for ent in line_doc.ents}
        
        # If line contains a medicine name or dosage patterns
        if "MEDICINE" in med_entities or "DOSAGE" in med_entities:
            med_info = {
                "name": med_entities.get("MEDICINE", "Unspecified Drug"),
                "dosage": med_entities.get("DOSAGE", "Standard dosage"),
                "frequency": med_entities.get("FREQUENCY", "As prescribed"),
                "duration": med_entities.get("DURATION", "Not specified"),
                "timing": med_entities.get("TIMING", "As advised"),
                "raw_line": line
            }
            medicines.append(med_info)

    return {
        "raw_text": text,
        "clean_tokens": clean_tokens,
        "pos_tags": pos_tags,
        "lemmas": lemmas,
        "entities": entities,
        "medicines": medicines
    }

def main():
    print("Initializing spaCy Medical Pipeline...")
    nlp = create_spacy_medical_nlp()

    # Demonstration with sample raw text or image
    sample_prescription_text = """
    Dr. Alex Smith - City Hospital
    Date: 2026-10-04
    
    Rx:
    1. Paracetamol 500 mg - twice daily after food for 5 days
    2. Amoxicillin 250mg - 1-0-1 for 7 days
    3. Omeprazole 20 mg - once daily before meals for 10 days
    
    Instructions: Take rest and sip warm water.
    """

    print("\n--- Processing Sample Prescription Text with spaCy ---")
    results = process_prescription_text(nlp, sample_prescription_text)
    
    print("\n[Extracted Named Entities (NER & Custom Ruler)]:")
    for ent in results["entities"]:
        print(f" - {ent['text']} ({ent['label']})")
        
    print("\n[Structured Medicine Recommendations]:")
    print(json.dumps(results["medicines"], indent=2))

if __name__ == "__main__":
    main()
