const mongoose = require("mongoose");
const Greeting = require("../models/Greeting");

exports.addReply = async (req, res) => {
  const { greetingId, senderName, replyContent } = req.body;

  // Validate request body
  if (!greetingId || !senderName || !replyContent) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate greetingId format
  if (!mongoose.Types.ObjectId.isValid(greetingId)) {
    return res.status(400).json({ message: "Invalid greeting ID" });
  }

  try {
    // Find the greeting by ID
    const greeting = await Greeting.findById(greetingId);
    if (!greeting) {
      return res.status(404).json({ message: "Greeting not found" });
    }

    // Add reply with timestamp
    greeting.replies.push({ senderName, replyContent, createdAt: new Date() });
    await greeting.save();

    res.status(201).json({
      message: "Reply added successfully",
      replies: greeting.replies,
    });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: error.message || "Error adding reply" });
  }
};

exports.getRepliesForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const greetings = await Greeting.find({ userId }).sort({ createdAt: -1 });

    if (!greetings || greetings.length === 0) {
      return res
        .status(404)
        .json({ message: "No greetings found for this user." });
    }

    const allReplies = greetings.flatMap((greeting) => greeting.replies);

    if (!allReplies || allReplies.length === 0) {
      return res
        .status(404)
        .json({ message: "No replies found for this user." });
    }

    res.status(200).json(allReplies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ message: "Failed to fetch replies", error });
  }
};

exports.deletReply = async (req, res) => {
  const { greetingId, replyId } = req.params;

  try {
    const greeting = await Greeting.findById(greetingId);

    if (!greeting) {
      return res.status(404).json({ error: "Greeting not found" });
    }

    const replyIndex = greeting.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );

    if (replyIndex === -1) {
      return res.status(404).json({ error: "Reply not found" });
    }

    greeting.replies.splice(replyIndex, 1);

    await greeting.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deletGreeting = async (req, res) => {
  const { greetingId } = req.params;
  try {
    // Find and delete the greeting
    const greeting = await Greeting.findByIdAndDelete(greetingId);

    if (!greeting) {
      return res.status(404).json({ error: "Greeting not found" });
    }

    // Optionally, delete associated replies (if needed)
    await Reply.deleteMany({ greetingId });

    res.status(200).json({
      message: "Greeting and associated replies deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting greeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
