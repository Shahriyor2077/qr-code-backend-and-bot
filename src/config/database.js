const mongoose = require('mongoose');
const Moderator = require('../models/Moderator');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB ga ulandi');
  
  const exists = await Moderator.findOne({ username: process.env.DEFAULT_MODERATOR_USERNAME });
  if (!exists) {
    await Moderator.create({
      username: process.env.DEFAULT_MODERATOR_USERNAME || 'admin',
      password: process.env.DEFAULT_MODERATOR_PASSWORD || 'admin123',
      name: 'Shahriyor'
    });
    console.log('Default moderator yaratildi');
  }
};

module.exports = connectDB;
