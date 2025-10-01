// routes/fireFighterRoutes.js
const express = require("express");
import Coordinate from "../models/Coordinate.js";

const router = express.Router();

// GET coordinates
router.get("/coordinates", async (req, res) => {
  try {
    const coords = await Coordinate.findOne();
    res.json(coords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});

export default router;
