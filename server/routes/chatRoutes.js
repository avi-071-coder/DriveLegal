const express = require("express");
const axios = require("axios");

const router = express.Router();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

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

    const result = await model.generateContent(
      `You are a concise yet detailed traffic law assistant. Explain the following briefly. DO NOT use markdown formatting like asterisks (*, **, ***) or hash symbols (#) for bold, italics, or headers. Instead, use normal capitalizations, clean line spacing, and simple lists with dashes (-) for clarity. Keep your response brief and direct.

      Question: ${message}`
    );

    const reply = result.response.text();

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
              content: "You are a concise yet detailed traffic law assistant. Explain things briefly. DO NOT use markdown formatting like asterisks (*, **, ***) or hash symbols (#) for bold, italics, or headers. Instead, use normal capitalizations, clean line spacing, and simple lists with dashes (-) for clarity. Keep your response brief and direct."
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

      const reply = openRouterResponse.data.choices[0].message.content;
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