const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Protected admin routes
router.get('/stats', authMiddleware, isAdmin, adminController.getDashboardStats);
router.get('/users', authMiddleware, isAdmin, adminController.getAllUsers);
router.get('/greetings', authMiddleware, isAdmin, adminController.getAllGreetings);
router.delete('/users/:id', authMiddleware, isAdmin, adminController.deleteUser);
router.delete('/greetings/:id', authMiddleware, isAdmin, adminController.deleteGreeting);
router.put('/users/:id', authMiddleware, isAdmin, adminController.updateUser);
router.put('/greetings/:id', authMiddleware, isAdmin, adminController.updateGreeting);
router.get('/activity-logs', authMiddleware, isAdmin, adminController.getActivityLogs);

module.exports = router; 