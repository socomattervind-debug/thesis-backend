const mongoose = require("mongoose");

const FireIncidentSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  barangay: {
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
    type: String,
    required: true,
  },
  timeArrival: {
    type: String,
    required: true,
    match: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
  },
  timeFinished: {
    type: String,
    required: true,
    match: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
  },
  cause: {
    type: String,
    required: true,
    trim: true,
  },
  severity: {
    type: String,
    required: true,
    enum: ["Minor", "Moderate", "Severe", "Critical"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FireIncident", FireIncidentSchema);
