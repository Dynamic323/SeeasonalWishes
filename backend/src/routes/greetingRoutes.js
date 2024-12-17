const express = require("express");
const router = express.Router();
const greetingController = require("../controllers/greetingController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Public routes
// router.get("/public", greetingController.getPublicGreetings);

// Protected routes
router.use(authMiddleware);  // Protect all routes below
router.post("/", greetingController.createGreeting);  // Route to create a new greeting
router.get("/:userId", greetingController.getUserGreetings);  // Route to get all greetings for a user
router.get("/share/:slug", greetingController.getGreetingBySlug);  // Route to get a greeting by its unique slug (for sharing)

module.exports = router;
