// routes/fireFighterLogin.js
const express = require("express");
const router = express.Router();
const FireFighter = require("../models/FireFighter");

router.post("/", async (req, res) => {
  try {
    const { fullName, password } = req.body;

    // Find user in DB
    const user = await FireFighter.findOne({ fullName });

    if (!user) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
