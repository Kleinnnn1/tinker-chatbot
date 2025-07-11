// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Single prompt to Gemini
export async function getChatResponse(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("🔴 Gemini API Error:", error);
    throw error;
  }
}
