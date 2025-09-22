const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");

// routes
const defaultRoute = require("./routes/default");
const userClient = require("./routes/client");
const fireFighter = require("./routes/fireFighter");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/defaultRoute", defaultRoute);
app.use("/userClient", userClient);
app.use("/fireFighter", fireFighter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
