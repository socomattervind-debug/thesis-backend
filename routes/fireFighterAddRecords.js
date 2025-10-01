const express = require("express");
const router = express.Router();
const FireIncident = require("../models/FireIncident");

// Add new fire incident record
router.post("/", async (req, res) => {
  try {
    const newIncident = new FireIncident(req.body);
    await newIncident.save();
    res
      .status(201)
      .json({ message: "Record added successfully", record: newIncident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all fire incidents
router.get("/records", async (req, res) => {
  try {
    const records = await FireIncident.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single fire incident by ID
router.get("/records/:id", async (req, res) => {
  try {
    const record = await FireIncident.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
