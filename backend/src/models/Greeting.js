const mongoose = require("mongoose");
const { Schema } = mongoose;

// Helper function to generate a unique slug
const generateSlug = () => {
  return Math.random().toString(36).substring(2, 15); // Generates a unique slug
};

const greetingSchema = new Schema(
  {
    recipientName: { type: String, required: true },
    messageContent: { type: String, required: true },
    category: { type: String, enum: ['birthday', 'anniversary', 'graduation', 'wedding', 'other'], required: true },
    background: { type: String, required: true }, // Color or background pattern
    eventDate: { type: Date, required: true },
    icon: { type: String }, // Optional icon
    title: { type: String }, // Optional title (e.g., "Happy Birthday!")
    slug: { type: String, unique: true, default: generateSlug }, // Unique slug for sharing
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Greeting = mongoose.model("Greeting", greetingSchema);

module.exports = Greeting;
