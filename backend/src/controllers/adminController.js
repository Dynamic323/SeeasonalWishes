const User = require('../models/User');
const Greeting = require('../models/Greeting');
const ActivityLog = require('../models/ActivityLog');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isAdmin: false }).catch(() => 0);
    const totalGreetings = await Greeting.countDocuments().catch(() => 0);
    const activeUsers = await User.countDocuments({ 
      lastLogin: { 
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
      } 
    }).catch(() => 0);
    const pendingReports = 0;

    res.json({
      totalUsers,
      totalGreetings,
      activeUsers,
      pendingReports
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

exports.getAllGreetings = async (req, res) => {
  try {
    const greetings = await Greeting.find()
      .populate('creator', 'username email')
      .sort({ createdAt: -1 });
    res.json(greetings);
  } catch (error) {
    console.error('Error in getAllGreetings:', error);
    res.status(500).json({ 
      message: 'Error fetching greetings',
      error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      action: 'DELETE_USER',
      performedBy: req.user.id,
      targetId: req.params.id
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.deleteGreeting = async (req, res) => {
  try {
    await Greeting.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      action: 'DELETE_GREETING',
      performedBy: req.user.id,
      targetId: req.params.id
    });
    res.json({ message: 'Greeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting greeting' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.updateGreeting = async (req, res) => {
  try {
    const updatedGreeting = await Greeting.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedGreeting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating greeting' });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('performedBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(logs);
  } catch (error) {
    console.error('Error in getActivityLogs:', error);
    res.status(500).json({ 
      message: 'Error fetching activity logs',
      error: error.message 
    });
  }
}; 