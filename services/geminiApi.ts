// services/geminiApi.ts
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
//const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {

    const result = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
      contents: message,
    });
    //console.log(JSON.stringify(result.candidates[0].content?.parts[0].text));
    //const response = await result.response;
    const text = result.candidates[0].content?.parts[0].text;
    return text || 'No response';
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong.";
  }
};
