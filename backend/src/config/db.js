const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://saikumar:sai2007@newone.aiaojqv.mongodb.net/vaveva_db?retryWrites=true&w=majority&appName=newOne';
    cachedPromise = mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
  }

  try {
    const conn = await cachedPromise;
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    cachedPromise = null;
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
