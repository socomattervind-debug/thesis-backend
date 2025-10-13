const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./db");
const Coordinate = require("./models/fireFighterRoutes");

// routes
const defaultRoute = require("./routes/default");
const userClient = require("./routes/client");
const fireFighter = require("./routes/fireFighter");
const fireFighterRoutes = require("./routes/fireFighterRoutes");
const fireFighterLogin = require("./routes/fireFighterLogin");
const fireFighterAddRecords = require("./routes/fireFighterAddRecords");
const hydrantCoordinates = require("./routes/fireFighterHydrant");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/defaultRoute", defaultRoute);
app.use("/userClient", userClient);
app.use("/fireFighter", fireFighter);
app.use("/fireFighterRoutes", fireFighterRoutes);
app.use("/fireFighterLogin", fireFighterLogin);
app.use("/fireFighterAddRecords", fireFighterAddRecords);
app.use("/fireFighterHydrant", hydrantCoordinates);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    // Socket.IO connection
    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    // Listen for changes in the coordinates collection
    const changeStream = Coordinate.watch();
    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const newCoord = change.fullDocument;
        io.emit("coordinatesUpdated", newCoord); // Notify all clients
        console.log("New coordinate added:", newCoord);
      }
    });

    // Start server
    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
