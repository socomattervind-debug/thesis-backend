// routes/fireFighterRoutes.js
const express = require("express");
const Coordinate = require("../models/fireFighterRoutes");

const router = express.Router();

// GET coordinates
router.get("/", async (req, res) => {
  try {
    const coords = await Coordinate.findOne();
    res.json(coords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});

module.exports = router;
