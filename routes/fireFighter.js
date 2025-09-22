const express = require("express");
const router = express.Router();
const fireFighter = require("../models/FireFighter");

router.post("/", async (req, res) => {
  try {
    const { fullName, password, barangay } = req.body;

    const newFireFighter = new fireFighter({
      fullName,
      password,
      barangay,
    });

    await newFireFighter.save(); // <-- save to MongoDB

    console.log("New fire fighter Registered Successfully!");
    res.json({
      message: "fire fighter registered successfully!",
      data: newFireFighter,
    });
  } catch (err) {
    console.error("Error saving fire fighter:", err);
    res.status(500).json({ error: "Failed to register fire fighter" });
  }
});

module.exports = router;
