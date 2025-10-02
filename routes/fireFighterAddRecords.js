const express = require("express");
const router = express.Router();
const FireIncident = require("../models/fireIncident");

router.post("/", async (req, res) => {
  try {
    const { city, address, date, timeArrival, timeFinished, cause, severity } =
      req.body;

    // Optional: extra validation before saving
    if (
      !city ||
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
    console.error("FireIncident Add Error:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;
