const Greeting = require("../models/Greeting");  // Import the Greeting model

// Create a new greeting
module.exports.createGreeting = async (req, res) => {
  try {
    const { recipientName, messageContent, category, background, eventDate, userId } = req.body;

    // Dynamically import nanoid
    const { nanoid } = await import('nanoid'); // Dynamically import nanoid

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

// Other functions using module.exports
module.exports.getUserGreetings = async (req, res) => {
  try {
    const userId = req.params.userId;
 console.log(userId);
 
    const greetings = await Greeting.find({ userId });

    res.status(200).json({
      success: true,
      data: greetings,
    });
  } catch (err) {
    console.error("Error fetching user greetings:", err);  // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to fetch greetings",
      error: err.message,
    });
  }
};

module.exports.getGreetingBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const greeting = await Greeting.findOne({ slug });

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: "Greeting not found",
      });
    }

    res.status(200).json({
      success: true,
      data: greeting,
    });
  } catch (err) {
    console.error("Error fetching greeting by slug:", err);  // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to fetch greeting",
      error: err.message,
    });
  }
};
