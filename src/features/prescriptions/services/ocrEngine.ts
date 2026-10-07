import * as tesseract from "tesseract.js";

export interface OcrWord {
  text: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
}

export interface OcrLine {
  text: string;
  confidence: number;
  bbox: [number, number, number, number];
  words: OcrWord[];
}

export interface OcrEngineResult {
  text: string;
  confidence: number;
  lines: OcrLine[];
  words: OcrWord[];
  preprocessingMethodUsed: string;
}

/**
 * Preprocesses image base64 if needed or runs Tesseract OCR across candidates
 */
export async function runOcrPipeline(params: {
  imageBase64?: string;
  fileBuffer?: Buffer;
  rawText?: string;
}): Promise<OcrEngineResult> {
  // If raw text is already provided directly (e.g. text input / mock)
  if (params.rawText && !params.imageBase64 && !params.fileBuffer) {
    const rawLines = params.rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const lines: OcrLine[] = rawLines.map((lineText, idx) => {
      const wordsArr: OcrWord[] = lineText.split(/\s+/).map((wordText, wIdx) => ({
        text: wordText,
        confidence: 0.95,
        bbox: [10 + wIdx * 40, 10 + idx * 30, 45 + wIdx * 40, 35 + idx * 30]
      }));
      return {
        text: lineText,
        confidence: 0.95,
        bbox: [10, 10 + idx * 30, 300, 35 + idx * 30],
        words: wordsArr
      };
    });

    const allWords = lines.flatMap((l) => l.words);
    return {
      text: params.rawText,
      confidence: 0.95,
      lines,
      words: allWords,
      preprocessingMethodUsed: "Direct Raw Text"
    };
  }

  // If image payload is available
  let inputSource: Buffer | string | null = null;
  if (params.fileBuffer) {
    inputSource = params.fileBuffer;
  } else if (params.imageBase64) {
    const cleanBase64 = params.imageBase64.replace(/^data:image\/\w+;base64,/, "");
    inputSource = Buffer.from(cleanBase64, "base64");
  }

  if (!inputSource) {
    return {
      text: "",
      confidence: 0,
      lines: [],
      words: [],
      preprocessingMethodUsed: "None"
    };
  }

  try {
    const ret = await tesseract.recognize(inputSource, "eng", {
      logger: () => {}
    });

    const data = ret.data;
    const lines: OcrLine[] = [];
    const words: OcrWord[] = [];

    const pageData = data as any;
    if (pageData.lines && pageData.lines.length > 0) {
      for (const l of pageData.lines) {
        const lineWords: OcrWord[] = (l.words || []).map((w: any) => ({
          text: w.text ? w.text.trim() : "",
          confidence: (w.confidence || 0) / 100,
          bbox: [w.bbox?.x0 || 0, w.bbox?.y0 || 0, w.bbox?.x1 || 0, w.bbox?.y1 || 0]
        })).filter((w: OcrWord) => w.text.length > 0);

        lineWords.forEach((w) => words.push(w));

        lines.push({
          text: l.text ? l.text.trim() : "",
          confidence: (l.confidence || 0) / 100,
          bbox: [l.bbox?.x0 || 0, l.bbox?.y0 || 0, l.bbox?.x1 || 0, l.bbox?.y1 || 0],
          words: lineWords
        });
      }
    } else if (pageData.words && pageData.words.length > 0) {
      for (const w of pageData.words) {
        if (!w.text || !w.text.trim()) continue;
        const ocrW: OcrWord = {
          text: w.text.trim(),
          confidence: (w.confidence || 0) / 100,
          bbox: [w.bbox?.x0 || 0, w.bbox?.y0 || 0, w.bbox?.x1 || 0, w.bbox?.y1 || 0]
        };
        words.push(ocrW);
      }
    }

    const overallConfidence = (data.confidence || 0) / 100;

    return {
      text: data.text || "",
      confidence: overallConfidence,
      lines,
      words,
      preprocessingMethodUsed: "Tesseract OCR (Original)"
    };
  } catch (err) {
    console.error("[OcrEngine] Tesseract recognition error:", err);
    return {
      text: "",
      confidence: 0,
      lines: [],
      words: [],
      preprocessingMethodUsed: "Failed"
    };
  }
}
