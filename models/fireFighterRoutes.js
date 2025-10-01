// models/Coordinate.js
import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
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

export default mongoose.model("Coordinate", coordinateSchema);
