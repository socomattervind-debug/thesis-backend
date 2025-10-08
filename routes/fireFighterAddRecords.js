const express = require("express");
const router = express.Router();
const FireIncident = require("../models/FireIncident");

// ===============================
// 🧾 ADD NEW FIRE INCIDENT RECORD
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      city,
      barangay,
      address,
      date,
      timeArrival,
      timeFinished,
      cause,
      severity,
    } = req.body;

    if (
      !city ||
      !barangay ||
      !address ||
      !date ||
      !timeArrival ||
      !timeFinished ||
      !cause ||
      !severity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncident = new FireIncident(req.body);
    await newIncident.save();

    res
      .status(201)
      .json({ message: "Record added successfully", record: newIncident });
  } catch (err) {
    console.error("🔥 FireIncident Add Error:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ===============================
// 📋 GET ALL FIRE INCIDENT RECORDS
// ===============================
router.get("/", async (req, res) => {
  try {
    // Fetch all records sorted by newest first
    const records = await FireIncident.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    console.error("🔥 FireIncident Fetch Error:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;
