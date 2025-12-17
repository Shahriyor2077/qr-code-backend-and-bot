const mongoose = require('mongoose');
const Moderator = require('../models/Moderator');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB ga ulandi');
    
    const existingMod = await Moderator.findOne({ username: process.env.DEFAULT_MODERATOR_USERNAME });
    if (!existingMod) {
      await Moderator.create({
        username: process.env.DEFAULT_MODERATOR_USERNAME || 'admin',
        password: process.env.DEFAULT_MODERATOR_PASSWORD || 'admin123',
        name: 'Admin'
      });
      console.log('Default moderator yaratildi');
    }
  } catch (error) {
    console.error('MongoDB ulanish xatosi:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
