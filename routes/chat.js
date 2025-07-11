import express from "express";
import { getChatResponse } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("🔴 GemeniAI Error:", error); // <--- ADD THIS LINE
    res.status(500).json({ error: "Error generating response" });
  }
});


export default router;
