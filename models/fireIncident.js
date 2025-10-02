// models/FireIncident.js
const mongoose = require("mongoose");

const FireIncidentSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String, // naka "YYYY-MM-DD" format
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },
  timeArrival: {
    type: String, // naka "HH:MM" 24-hour format
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  timeFinished: {
    type: String, // naka "HH:MM" 24-hour format
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  cause: {
    type: String,
    required: true,
    trim: true,
  },
  severity: {
    type: String,
    required: true,
    enum: ["Minor", "Moderate", "Severe", "Critical"], // optional restriction
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FireIncident", FireIncidentSchema);
