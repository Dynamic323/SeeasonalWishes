const mongoose = require("mongoose"); // Corrected 'mongose' to 'mongoose'
const bcrypt = require("bcryptjs");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  },
  { timestamps: true }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password isn't modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Export the User model
module.exports = mongoose.model("User", userSchema); // Corrected 'mongose' to 'mongoose'
