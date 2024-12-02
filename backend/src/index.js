const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import custom modules
const connectDB = require('../config/dbConfig.js');

const authRoutes = require('./routes/authRoutes'); // Auth routes
const greetingsRoutes = require('./routes/greetingsRoutes'); // Greetings routes
const Greeting = require('./models/Greeting'); // Greeting model

// Load environment variables
dotenv.config({ path: './season.env' });

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

// Middleware to parse incoming requests
app.use(bodyParser.json()); // Parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded requests

// Routes
app.use('/api/auth', authRoutes); // Handles authentication: register, login
app.use('/api/greetings', greetingsRoutes); // Handles greetings: create, read, etc.

// Connect to MongoDB
connectDB(); // Function in `config/dbConfig.js`

// Cron job to mark greetings as expired
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    console.log(`Running cron job. Current time: ${now}`);

    // Find greetings that have expired and are still marked as pending
    const pendingGreetings = await Greeting.find({
      expiresAt: { $lt: now },
      status: 'pending',
    });

    console.log('Pending greetings to expire:', pendingGreetings);

    // Update greetings to "expired"
    const result = await Greeting.updateMany(
      { expiresAt: { $lt: now }, status: 'pending' },
      { $set: { status: 'expired' } }
    );

    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
  } catch (error) {
    console.error('Error while expiring greetings:', error);
  }
});

// Start the server
mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure proper options
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

module.exports = app; // Export app for testing
