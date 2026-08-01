const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vaveva_db',
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: ${error.message}. Running in Mock/In-Memory Data Mode.`);
  }
};

module.exports = connectDB;
