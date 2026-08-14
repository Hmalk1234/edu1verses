import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined. Using default fallback configuration.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const CANDIDATE_MODELS = [
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite"
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientError(error: any): boolean {
  if (!error) return false;
  const str = String(error?.message || error?.status || JSON.stringify(error));
  return (
    str.includes("503") ||
    str.includes("UNAVAILABLE") ||
    str.includes("high demand") ||
    str.includes("429") ||
    str.includes("RESOURCE_EXHAUSTED") ||
    str.includes("rate limit") ||
    str.includes("500") ||
    str.includes("INTERNAL")
  );
}

export async function generateContentWithFallback(
  params: Omit<GenerateContentParameters, "model"> & { preferredModel?: string }
): Promise<GenerateContentResponse> {
  const ai = getGenAI();
  const preferred = params.preferredModel || "gemini-3.7-flash";
  const modelsToTry = [
    preferred,
    ...CANDIDATE_MODELS.filter((m) => m !== preferred),
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          ...params,
          model,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const isTransient = isTransientError(err);
        
        if (isTransient && attempt === 0) {
          await delay(400);
          continue;
        }
        
        if (isTransient) {
          break;
        } else {
          break;
        }
      }
    }
  }

  throw lastError;
}
