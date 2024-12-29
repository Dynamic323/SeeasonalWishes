const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  greetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Greeting",
    required: true,
  },
  replies: {
    senderName: { type: String, required: true }, // Name of the recipient replying
    replyContent: { type: String, required: true }, // The reply message
    createdAt: { type: Date, default: Date.now }, // Timestamp for reply
  },

  timestamps: true,
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
