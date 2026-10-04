import en from "./translations/en.json";
import hi from "./translations/hi.json";
import ta from "./translations/ta.json";

export type TranslationDictionary = typeof en;

const dictionaries: Record<string, any> = {
  en,
  hi,
  ta
};

/**
 * Retrieves a translated string by dot notation path (e.g. "app.title", "medicines.dosage").
 * Falls back to English if the translation or specific key is missing.
 */
export function getTranslation(path: string, lang = "en"): string {
  const dictionary = dictionaries[lang] || dictionaries.en;
  const parts = path.split(".");

  let current = dictionary;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      current = null;
      break;
    }
  }

  if (typeof current === "string") return current;

  // Fallback to English
  let fallback = dictionaries.en;
  for (const part of parts) {
    if (fallback && typeof fallback === "object" && part in fallback) {
      fallback = fallback[part];
    } else {
      return path;
    }
  }

  return typeof fallback === "string" ? fallback : path;
}

/**
 * Translates dosage timing phrases into regional languages while preserving
 * standard drug names and units.
 */
export function translateInstruction(text: string, lang: string): string {
  if (!text || lang === "en") return text;

  const phraseMap: Record<string, Record<string, string>> = {
    hi: {
      "After food": "खाने के बाद",
      "Before food": "खाने से पहले (खाली पेट)",
      "With food": "भोजन के साथ",
      "Twice daily": "दिन में दो बार",
      "Once daily": "दिन में एक बार",
      "Three times daily": "दिन में तीन बार",
      "Four times daily": "दिन में चार बार",
      "At bedtime": "सोने से पहले",
      "As needed": "ज़रूरत पड़ने पर",
      "1 tablet": "1 गोली",
      "2 tablets": "2 गोलियां",
      "5 days": "5 दिनों के लिए",
      "7 days": "7 दिनों के लिए",
      "Needs verification": "सत्यापन आवश्यक"
    },
    ta: {
      "After food": "உணவுக்குப் பின்",
      "Before food": "உணவுக்கு முன்",
      "With food": "உணவுடன்",
      "Twice daily": "ஒரு நாளைக்கு இரண்டு முறை",
      "Once daily": "ஒரு நாளைக்கு ஒரு முறை",
      "Three times daily": "ஒரு நாளைக்கு மூன்று முறை",
      "At bedtime": "இரவு படுக்கைக்கு முன்",
      "As needed": "தேவைப்படும்போது",
      "1 tablet": "1 மாத்திரை",
      "Needs verification": "சரிபார்ப்பு தேவை"
    }
  };

  const map = phraseMap[lang];
  if (!map) return text;

  let translated = text;
  for (const [eng, local] of Object.entries(map)) {
    translated = translated.replace(new RegExp(eng, "gi"), local);
  }

  return translated;
}
