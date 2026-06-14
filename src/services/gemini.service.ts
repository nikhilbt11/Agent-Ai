import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export class GeminiService {
  async generateResponse(
    prompt: string
  ) {
try {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
} catch (error: any) {
  if (
    error?.message?.includes("429")
  ) {
    return "The AI service is currently busy. Please try again in a few minutes.";
  }

  throw error;
}
  }
}