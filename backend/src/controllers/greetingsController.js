const Greeting = require('../models/Greeting');
const Message = require('../models/message');
const User = require('../models/User');

exports.sendGreeting = async (req, res) => {
  try {
    const { recipientId, messageId, expirationDays } = req.body;
    const sender = req.user.id; // Assuming you have user info in the request after authentication

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    const greeting = new Greeting({
      sender,
      recipient: recipientId,
      message: messageId,
      expiresAt
    });

    await greeting.save();
    res.status(201).json({ message: 'Greeting sent successfully', greeting });
  } catch (error) {
    res.status(500).json({ message: 'Error sending greeting', error: error.message });
  }
};

exports.getReceivedGreetings = async (req, res) => {
  try {
    const greetings = await Greeting.find({ recipient: req.user.id })
      .populate('sender', 'username')
      .populate('message', 'content category');
    res.json(greetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving greetings', error: error.message });
  }
};

exports.updateGreetingStatus = async (req, res) => {
  try {
    const { greetingId, status } = req.body;
    const greeting = await Greeting.findById(greetingId);

    if (!greeting) {
      return res.status(404).json({ message: 'Greeting not found' });
    }

    if (greeting.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this greeting' });
    }

    greeting.status = status;
    await greeting.save();

    res.json({ message: 'Greeting status updated successfully', greeting });
  } catch (error) {
    res.status(500).json({ message: 'Error updating greeting status', error: error.message });
  }
};

exports.provideFeedback = async (req, res) => {
  try {
    const { greetingId, feedback } = req.body;
    const greeting = await Greeting.findById(greetingId);

    if (!greeting) {
      return res.status(404).json({ message: 'Greeting not found' });
    }

    if (greeting.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to provide feedback for this greeting' });
    }

    greeting.feedback = feedback;
    await greeting.save();

    res.json({ message: 'Feedback provided successfully', greeting });
  } catch (error) {
    res.status(500).json({ message: 'Error providing feedback', error: error.message });
  }
};