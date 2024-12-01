const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as needed

// Controller for user registration
const register = async (req, res) => {
  console.log('Received data:', req.body);

  // Destructure and validate request body
  const { email, password, name, username } = req.body;

  if (!email || !password || !name || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });

    await newUser.save();
    console.log('New user:', newUser);

    // Respond with success
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Log and respond with server error
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Controller for user login
const login = async (req, res) => {
  console.log('Login attempt:', req.body);

  // Destructure request body
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Respond with success and user details (without password)
    return res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    // Log and respond with server error
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
