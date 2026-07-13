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

router.post("/chat/stream", async (req, res) => {
  // Set up SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const { message } = req.body;

  try {
    if (!message) {
      res.write(`data: ${JSON.stringify({ text: "Please provide a message." })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    if (!process.env.GEMINI_API_KEY) {
      res.write(`data: ${JSON.stringify({ text: "Chat service is temporarily unavailable (Missing API Key)." })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const resultStream = await model.generateContentStream(
      `You are a concise, structured traffic law assistant. Your answers MUST be specific to Indian traffic laws, the Motor Vehicles Act, and Indian regulations unless the user explicitly asks about another country. Provide a structured, proper, and highly concise response. 
      - Use simple lists with dashes (-).
      - Use normal capitalizations for headers.
      - DO NOT use markdown symbols like asterisks (*) or hash signs (#).
      - Keep your answer brief and directly to the point.

      Question: ${message}`
    );

    for await (const chunk of resultStream) {
      const chunkText = chunk.text();
      res.write(`data: ${JSON.stringify({ text: cleanResponse(chunkText) })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
    
  } catch (error) {
    console.error("Gemini Error, falling back to OpenRouter:", error.message);
    
    if (!process.env.OPENROUTER_API_KEY) {
      res.write(`data: ${JSON.stringify({ text: "\n\n[Error: Gemini is busy and OpenRouter fallback is unavailable. Please check API keys.]" })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    try {
      // Require axios locally just for the fallback
      const axios = require("axios");
      const openRouterResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are a concise, structured traffic law assistant. Your answers MUST be specific to Indian traffic laws, the Motor Vehicles Act, and Indian regulations unless the user explicitly asks about another country. Provide a structured, proper, and highly concise response. Use simple lists with dashes (-). Use normal capitalizations for headers. DO NOT use markdown symbols like asterisks (*) or hash signs (#). Keep your answer brief and directly to the point."
            },
            {
              role: "user",
              content: message
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
      // Since it's a fallback, we just send the whole chunk at once
      res.write(`data: ${JSON.stringify({ text: reply })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
      
    } catch (fallbackError) {
      console.error("OpenRouter Fallback Error:", fallbackError.message);
      res.write(`data: ${JSON.stringify({ text: "\n\n[Error: Both Gemini and OpenRouter AI services are currently unavailable. Please try again later.]" })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
});

module.exports = router;