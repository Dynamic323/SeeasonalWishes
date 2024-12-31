const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const replyRoutes = require("./src/routes/replyRoutes");
const greetingRoutes = require("./src/routes/greetingRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["https://seeasonal-wishes-fnd.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Added "Authorization" to ensure it matches the client-side headers
  credentials: true, // Allow credentials (cookies, sessions, etc.)
};

app.use(cors(corsOptions));

// Routes

app.use("/api/replies", replyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/greetings", greetingRoutes);

app.get("/api", (req, res) => {
  console.log("mongodb" + process.env.MONGO_URI);
  console.log("JWT" + process.env.JWT_SECRET);
  res.send("Backen is Active...");
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/ip", async (req, res) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    res.send(`Your Render IP Address: ${data.ip}`);
  } catch (error) {
    res.status(500).send("Error fetching IP address");
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
