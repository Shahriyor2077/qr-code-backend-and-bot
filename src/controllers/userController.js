const QRCode = require('qrcode');
const User = require('../models/User');

// Yangi foydalanuvchi yaratish
const createUser = async (req, res) => {
  try {
    const { name, phone, branch } = req.body;
    
    const user = await User.create({
      name,
      phone,
      branch,
      createdBy: req.session.moderatorId
    });
    
    // QR kod yaratish
    const botUsername = process.env.BOT_USERNAME || 'your_bot';
    const qrData = `https://t.me/${botUsername}?start=${user._id}`;
    const qrCode = await QRCode.toDataURL(qrData);
    
    user.qrCode = qrCode;
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Barcha foydalanuvchilar
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bitta foydalanuvchi
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('checkHistory.addedBy', 'name');
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Chek qo'shish (+1)
const addCheck = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    
    user.checkCount += 1;
    user.checkHistory.push({ addedBy: req.session.moderatorId });
    await user.save();
    
    res.json({ success: true, checkCount: user.checkCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Foydalanuvchi qidirish
const searchUsers = async (req, res) => {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { branch: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public API (bot uchun)
const getPublicUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name phone branch checkCount');
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  addCheck,
  searchUsers,
  getPublicUser
};
