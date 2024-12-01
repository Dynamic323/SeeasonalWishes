const Greeting = require('../models/Greeting');

const checkExpiration = async (req, res, next) => {
  try {
    const now = new Date();
    await Greeting.updateMany(
      { expiresAt: { $lte: now }, status: 'pending' },
      { $set: { status: 'expired' } }
    );
    next();
  } catch (error) {
    console.error('Error checking greeting expiration:', error);
    next(error);
  }
};

module.exports = { checkExpiration };