const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const replyRoutes = require("./routes/replyRoutes");
const greetingRoutes = require("./routes/greetingRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*", // Allow access from all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow cookies and credentials (if needed)
};

app.use(cors(corsOptions)); // Apply CORS with the defined options

// Routes

app.use("/api/replies", replyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/greetings", greetingRoutes);

app.get("/api", (req, res) => {
  res.send("Backen is Active...");
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
