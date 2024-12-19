const Greeting = require("../models/Greeting"); // Import the Greeting model

// Create a new greeting
module.exports.createGreeting = async (req, res) => {
  try {
    const {
      recipientName,
      messageContent,
      category,
      background,
      eventDate,
      userId,
    } = req.body;

    // Dynamically import nanoid
    const { nanoid } = await import("nanoid");

    // Generate a unique slug
    const slug = nanoid(10); // Generates a unique 10-character slug

    const newGreeting = new Greeting({
      recipientName,
      messageContent,
      category,
      background,
      eventDate,
      slug,
      userId,
    });

    const savedGreeting = await newGreeting.save();

    res.status(201).json({
      success: true,
      message: "Greeting created successfully",
      data: savedGreeting,
    });
  } catch (err) {
    console.error("Error creating greeting:", err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to create greeting",
      error: err.message,
    });
  }
};

// Get all greetings for a user
module.exports.getUserGreetings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const greetings = await Greeting.find({ userId });

    res.status(200).json({
      success: true,
      data: greetings,
    });
  } catch (err) {
    console.error("Error fetching user greetings:", err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to fetch greetings",
      error: err.message,
    });
  }
};

// Get greeting by slug
module.exports.getGreetingBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const greeting = await Greeting.findOne({ slug });

    if (!greeting) {
      return res.status(404).json({ message: "Greeting not found" });
    }

    res.status(200).json(greeting);
  } catch (error) {
    res.status(500).json({ message: "Error fetching greeting" });
  }
};
