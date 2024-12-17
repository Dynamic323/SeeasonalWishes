const express = require("express");
const router = express.Router();
const greetingController = require("../controllers/greetingController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Public routes
// router.get("/public", greetingController.getPublicGreetings);

// Protected routes
router.use(authMiddleware); // Protect all routes below

// Route to fetch a greeting by its unique slug (for sharing)
router.get("/share/:slug", greetingController.getGreetingBySlug);

// Route to get all greetings for a user
router.get("/:userId", greetingController.getUserGreetings);

// Route to create a new greeting
router.post("/", greetingController.createGreeting);
module.exports = router;
