// routes/fireFighterRoutes.js
const express = require("express");
const HydrantCoordinates = require("../models/fireFightherHydrantRoutes");

const router = express.Router();

// GET coordinates
router.get("/", async (req, res) => {
  try {
    const hydrantCoordinates = await HydrantCoordinates.findOne();
    res.json(hydrantCoordinates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});

module.exports = router;
