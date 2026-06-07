const express = require("express");

const router = express.Router();

const Law = require("../models/Law");

router.post("/calculate", async (req, res) => {
  try {
    const { state, violation, vehicleType } = req.body;

    if (!state || !violation || !vehicleType) {
      return res.status(400).json({ error: "Please provide state, violation, and vehicleType." });
    }

    const law = await Law.findOne({
      state: { $regex: new RegExp(`^${state}$`, "i") },
      violation: { $regex: new RegExp(`^${violation}$`, "i") },
      vehicleType: { $regex: new RegExp(`^${vehicleType}$`, "i") }
    });

    if (!law) {
      return res.json({
        fine: "No Data Found",
      });
    }

    res.json(law);
  } catch (error) {
    console.error("Calculate Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;