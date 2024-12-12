const express = require('express');
const router = express.Router();
const greetingController = require('../controllers/greetingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.get('/public', greetingController.getPublicGreetings);

// Protected routes
router.use(authMiddleware);
router.post('/', greetingController.createGreeting);
router.get('/', greetingController.getUserGreetings);
router.get('/:id', greetingController.getGreetingById);
router.put('/:id', greetingController.updateGreeting);
router.delete('/:id', greetingController.deleteGreeting);
router.post('/:id/like', greetingController.likeGreeting);
router.post('/:id/unlike', greetingController.unlikeGreeting);
router.patch('/:id/visibility', greetingController.toggleVisibility);

module.exports = router; 