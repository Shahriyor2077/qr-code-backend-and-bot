const Moderator = require('../models/Moderator');

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const moderator = await Moderator.findOne({ username });
    
    if (!moderator || !(await moderator.comparePassword(password))) {
      return res.status(401).json({ error: 'Login yoki parol xato' });
    }
    
    req.session.moderatorId = moderator._id;
    res.json({ success: true, name: moderator.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
const logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true });
};

// Auth tekshirish
const checkAuth = async (req, res) => {
  const moderator = await Moderator.findById(req.session.moderatorId);
  res.json({ authenticated: true, name: moderator.name });
};

module.exports = { login, logout, checkAuth };
