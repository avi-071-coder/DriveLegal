const express = require("express");

const router = express.Router();

const Law = require("../models/Law");

function escapeRegex(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/calculate", async (req, res) => {
  try {
    const { state, violation, vehicleType } = req.body;

    if (!state || !violation || !vehicleType) {
      return res.status(400).json({ error: "Please provide state, violation, and vehicleType." });
    }

    const safeState = escapeRegex(state);
    const safeViolation = escapeRegex(violation);
    const safeVehicleType = escapeRegex(vehicleType);

    const law = await Law.findOne({
      state: { $regex: new RegExp(`^${safeState}$`, "i") },
      violation: { $regex: new RegExp(`^${safeViolation}$`, "i") },
      vehicleType: { $regex: new RegExp(`^${safeVehicleType}$`, "i") }
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