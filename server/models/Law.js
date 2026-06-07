const mongoose = require("mongoose");

const lawSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },

  violation: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    required: true,
  },

  fine: {
    type: Number,
    required: true,
  },

  repeatFine: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model(
  "Law",
  lawSchema
);