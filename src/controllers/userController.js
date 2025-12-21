const QRCode = require('qrcode');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, phone, branch } = req.body;
  const user = await User.create({ name, phone, branch, createdBy: req.session.moderatorId });
  
  user.qrCode = await QRCode.toDataURL(`https://t.me/${process.env.BOT_USERNAME}?start=${user._id}`);
  await user.save();
  
  res.json(user);
};

const getAllUsers = async (_, res) => {
  res.json(await User.find().sort({ createdAt: -1 }));
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate('checkHistory.addedBy', 'name');
  user ? res.json(user) : res.status(404).json({ error: 'Topilmadi' });
};

const addCheck = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Topilmadi' });
  
  user.checkCount += 1;
  user.checkHistory.push({ addedBy: req.session.moderatorId });
  await user.save();
  
  res.json({ success: true, checkCount: user.checkCount });
};

const searchUsers = async (req, res) => {
  const q = req.params.query;
  res.json(await User.find({
    $or: [{ name: { $regex: q, $options: 'i' } }, { phone: { $regex: q, $options: 'i' } }, { branch: { $regex: q, $options: 'i' } }]
  }));
};

module.exports = { createUser, getAllUsers, getUserById, addCheck, searchUsers };
