const mongoose = require('mongoose');

async function connectDB(link) {
  try {
    const mongoURI = link; 
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Thoát tiến trình nếu không thể kết nối với database (tùy chọn)
    process.exit(1);
  }
};

module.exports = connectDB;