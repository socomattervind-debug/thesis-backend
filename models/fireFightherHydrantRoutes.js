// models/Coordinate.js
const mongoose = require("mongoose");

const HydrantCoordinates = new mongoose.Schema({
  origin: {
    latitude: Number,
    longitude: Number,
    name: String,
  },
  destination: {
    latitude: Number,
    longitude: Number,
    name: String,
  },
});

module.exports = mongoose.model("HydrantCoordinates", HydrantCoordinates);
