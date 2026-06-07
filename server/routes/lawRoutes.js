const express = require("express");

const router = express.Router();

const Law = require("../models/Law");

router.get("/laws", async (req, res) => {
  try {
    const laws = await Law.find();
    res.json(laws);
  } catch (error) {
    console.error("Laws Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/laws/:state", async (req, res) => {
  try {
    const state = req.params.state;
    const filteredLaws = await Law.find({
      state: { $regex: new RegExp(`^${state}$`, "i") }
    });
    res.json(filteredLaws);
  } catch (error) {
    console.error("Laws by State Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;