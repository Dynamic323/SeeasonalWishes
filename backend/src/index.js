const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const greetingRoutes = require("./routes/greetingRoutes");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["https://seeasonal-wishes-fnd.vercel.app", "http://localhost:5173"], // Multiple allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Methods allowed
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // If your backend is handling cookies or session data
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/greetings", greetingRoutes);

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
