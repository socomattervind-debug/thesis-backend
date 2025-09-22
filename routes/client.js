const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;

    const newClient = new Client({
      fullName,
      email,
      password,
      phoneNumber,
      address,
    });

    await newClient.save(); // <-- save to MongoDB

    console.log("New Client Registered Successfully!");
    res.json({
      message: "Client registered successfully!",
      data: newClient,
    });
  } catch (err) {
    console.error("Error saving client:", err);
    res.status(500).json({ error: "Failed to register client" });
  }
});

module.exports = router;
