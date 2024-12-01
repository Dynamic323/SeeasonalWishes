// routes/greetingsRoutes.js

const express = require('express');
const router = express.Router();
const greetingsController = require('../controllers/greetingsController');
const authMiddleware = require('../middleware/authMiddleware');

// Ensure authMiddleware.verifyToken is a function before using it
if (typeof authMiddleware.verifyToken !== 'function') {
  console.error('authMiddleware.verifyToken is not a function');
  // Provide a default middleware if verifyToken is not available
  authMiddleware.verifyToken = (req, res, next) => next();
}

// Apply the middleware to all routes
router.use(authMiddleware.verifyToken);

router.post('/send', greetingsController.sendGreeting);
router.get('/received', greetingsController.getReceivedGreetings);
router.put('/update-status', greetingsController.updateGreetingStatus);
router.post('/feedback', greetingsController.provideFeedback);

module.exports = router;
