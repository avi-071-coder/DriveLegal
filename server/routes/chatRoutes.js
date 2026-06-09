const express = require("express");
const axios = require("axios");

const router = express.Router();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// Helper function to strictly remove markdown formatting (bold asterisks, hashes, backticks)
// while keeping simple structured lists (replacing asterisk bullets with dashes)
function cleanResponse(text) {
  if (!text) return "";
  return text
    .replace(/^\s*\*\s+/gm, "- ") // Convert asterisk bullets to dash bullets
    .replace(/\*/g, "")           // Remove bold/italic asterisks
    .replace(/#/g, "")           // Remove header hashes
    .replace(/`/g, "")           // Remove backticks
    .trim();
}

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Please provide a message." });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return res.status(500).json({ error: "Chat service is temporarily unavailable." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    // Fast-failing timeout of 3.5 seconds to instantly fall back if Gemini hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API connection timeout")), 3500)
    );

    const result = await Promise.race([
      model.generateContent(
        `You are a concise, structured traffic law assistant. Provide a structured, proper, and highly concise response. 
        - Use simple lists with dashes (-).
        - Use normal capitalizations for headers.
        - DO NOT use markdown symbols like asterisks (*) or hash signs (#).
        - Keep your answer brief and directly to the point.

        Question: ${message}`
      ),
      timeoutPromise
    ]);

    const reply = cleanResponse(result.response.text());

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Error, falling back to OpenRouter:", error.message);
    
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(503).json({ error: "Gemini is busy and OpenRouter fallback is unavailable (Missing API Key). Please add OPENROUTER_API_KEY to your .env file." });
    }

    try {
      const openRouterResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are a concise, structured traffic law assistant. Provide a structured, proper, and highly concise response. Use simple lists with dashes (-). Use normal capitalizations for headers. DO NOT use markdown symbols like asterisks (*) or hash signs (#). Keep your answer brief and directly to the point."
            },
            {
              role: "user",
              content: req.body.message
            }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = cleanResponse(openRouterResponse.data.choices[0].message.content);
      return res.json({ reply });
      
    } catch (fallbackError) {
      console.error("OpenRouter Fallback Error Details:", fallbackError.response?.data || fallbackError.message);
      return res.status(500).json({
        error: "Both Gemini and OpenRouter AI services are currently unavailable. Please try again later.",
      });
    }
  }
});

module.exports = router;