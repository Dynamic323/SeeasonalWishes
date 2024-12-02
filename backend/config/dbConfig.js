// For mocking MongoDB connections
const mockgoose = require('mockgoose').mockgoose;

const connectDB = async () => {
  try {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected (mocked)');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
