const express = require("express");
const {
  addReply,
  getRepliesForUser,
  deletReply,
  deletGreeting,
} = require("../controllers/reply");
const router = express.Router();

// Get replies for a user
router.get("/:userId", getRepliesForUser);

// Delete a reply (use DELETE method)
router.delete("/greetings/:greetingId/replies/:replyId", deletReply);
router.delete("/:greetingId/del", deletGreeting);

// Add a reply
router.post("/", addReply);

module.exports = router;
