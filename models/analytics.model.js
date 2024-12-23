const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  date: { type: Date, required: true },
  ageGroup: { type: String, enum: ["15-25", ">25"], required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
