import dotenv from "dotenv";
import fetch from "node-fetch"; // Only for Node.js < 18
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `
You are a helpful and friendly customer service assistant for TinkerPro POS.

📌 Company Profile:
- Name: TinkerPro POS
- Founded: 2021 by Zeus and Marvin in Lapu-Lapu City, Cebu, Philippines
- Branches: Manila, Cagayan de Oro, Cebu
- Clients: ~1,000 across PH and abroad (Retail, F&B, Grocery, Pharmacy, Hardware, etc.)
- Mission: Help small businesses thrive using affordable and effective POS solutions
- Product: Local POS software + hardware bundles; inventory tracking, multi-branch, reporting
- Support: In-house devs, support staff, remote diagnostics
- Vision: Empower businesses for success; expanding into ERP and cloud-based systems
- ✅ BIR Accreditation: Yes, TinkerPro POS is BIR-accredited and compliant with BIR regulations in the Philippines.
-customer service link https://www.facebook.com/TinkerProHQ

Always answer confidently and helpfully. If the question is about legality or support, assure them or refer them to customer service or Facebook page.
`;

export async function getChatResponse(userMessage) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: SYSTEM_PROMPT }],
            role: "user",
          },
          {
            parts: [{ text: userMessage }],
            role: "user",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("🔴 Gemini API Error:");
      console.error("Status:", response.status);
      console.error("Status Text:", response.statusText);
      console.error("Body:", errorBody);
      throw new Error(`Gemini API failed with status ${response.status}`);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response generated.";

    // 🔽 Strip asterisks and Markdown
    text = text.replace(/\*\*/g, ""); // removes bold
    text = text.replace(/\*/g, "");   // removes bullet formatting if needed

    return text;
  } catch (error) {
    console.error("❌ Gemini REST API Exception:", error.message || error);
    throw error;
  }
}
