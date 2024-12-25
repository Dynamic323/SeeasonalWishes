const greetingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientName: { type: String, required: true },
    messageContent: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "birthday",
        "anniversary",
        "Holiday",
        "graduation",
        "wedding",
        "other",
      ],
      required: true,
    },
    background: { type: String, required: true },
    eventDate: { type: Date, required: true },
    icon: { type: String },
    title: { type: String },
    slug: { type: String, unique: true, default: generateSlug },
    status: {
      type: String,
      enum: ["Scheduled", "Delivered", "Draft", "Expired"],
      default: "Scheduled",
    },
    replies: [
      {
        senderName: { type: String, required: true },
        replyContent: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ], // Embedding replies directly
  },
  {
    timestamps: true,
  }
);

const Greeting = mongoose.model("Greeting", greetingSchema);

module.exports = Greeting;
