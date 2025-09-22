const mongoose = require("mongoose");

const fireFighterSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    barangay: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FireFighter", fireFighterSchema);
