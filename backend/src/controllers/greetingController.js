const Greeting = require('../models/Greeting');

// Create a new greeting
exports.createGreeting = async (req, res) => {
  try {
    const { title, message, occasion, backgroundColor, textColor, isPublic } = req.body;
    
    const greeting = new Greeting({
      title,
      message,
      occasion,
      backgroundColor,
      textColor,
      isPublic: isPublic || false,
      creator: req.user.id
    });

    await greeting.save();

    res.status(201).json({
      success: true,
      data: greeting
    });
  } catch (error) {
    console.error('Create greeting error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all public greetings
exports.getPublicGreetings = async (req, res) => {
  try {
    const greetings = await Greeting.find({ isPublic: true })
      .populate('creator', 'username')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: greetings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching public greetings'
    });
  }
};

// Get user's greetings
exports.getUserGreetings = async (req, res) => {
  try {
    const greetings = await Greeting.find({ creator: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: greetings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user greetings'
    });
  }
};

// Get a specific greeting by ID
exports.getGreetingById = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id)
      .populate('creator', 'username');
    
    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    // Check if greeting is public or belongs to user
    if (!greeting.isPublic && greeting.creator._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this greeting'
      });
    }

    res.json({
      success: true,
      data: greeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching greeting'
    });
  }
};

// Update a greeting
exports.updateGreeting = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id);

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    // Check if user owns the greeting
    if (greeting.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this greeting'
      });
    }

    const updatedGreeting = await Greeting.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        updatedAt: Date.now() 
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedGreeting
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating greeting'
    });
  }
};

// Delete a greeting
exports.deleteGreeting = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id);

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    // Check if user owns the greeting
    if (greeting.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this greeting'
      });
    }

    await Greeting.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Greeting deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting greeting'
    });
  }
};

// Like a greeting
exports.likeGreeting = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id);

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    // Check if the greeting is already liked by the user
    if (greeting.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Greeting already liked'
      });
    }

    greeting.likes.push(req.user.id);
    await greeting.save();

    res.json({
      success: true,
      data: greeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking greeting'
    });
  }
};

// Unlike a greeting
exports.unlikeGreeting = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id);

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    // Remove the user's ID from likes array
    greeting.likes = greeting.likes.filter(
      like => like.toString() !== req.user.id
    );
    await greeting.save();

    res.json({
      success: true,
      data: greeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error unliking greeting'
    });
  }
};

// Toggle greeting visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const greeting = await Greeting.findById(req.params.id);

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: 'Greeting not found'
      });
    }

    if (greeting.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this greeting'
      });
    }

    greeting.isPublic = !greeting.isPublic;
    await greeting.save();

    res.json({
      success: true,
      data: greeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling greeting visibility'
    });
  }
}; 