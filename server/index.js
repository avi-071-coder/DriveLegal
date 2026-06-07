const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  "/api",
  require("./routes/chatRoutes")
);

app.use(
  "/api",
  require("./routes/calculatorRoutes")
);

app.use(
  "/api",
  require("./routes/lawRoutes")
);

app.get("/", (req, res) => {
  res.send("DriveLegal API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});