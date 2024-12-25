const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  Day: { type: String, required: true }, // Store dates as Date objects
  Age: { type: String, required: true }, // Example: "15-25" or ">25"
  Gender: { type: String, required: true }, // Example: "Female" or "Male"
  A: { type: Number, required: true },
  B: { type: Number, required: true },
  C: { type: Number, required: true },
  D: { type: Number, required: true },
  E: { type: Number, required: true },
  F: { type: Number, required: true },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
