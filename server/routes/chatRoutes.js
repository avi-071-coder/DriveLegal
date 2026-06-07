const express = require("express");

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
      `You are a traffic law assistant.
      ${message}`
    );

    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      error: "An error occurred while communicating with the AI.",
    });
  }
});

module.exports = router;