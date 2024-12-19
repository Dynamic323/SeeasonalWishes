const express = require("express");
const router = express.Router();
const greetingController = require("../controllers/greetingController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Public route (no middleware)
router.get("/share/:slug", greetingController.getGreetingBySlug);

// Protected routes (require authentication)
router.use(authMiddleware); // Protect all routes below

// Route to get all greetings for a user
router.get("/:userId", greetingController.getUserGreetings);

// Route to create a new greeting
router.post("/", greetingController.createGreeting);

module.exports = router;
