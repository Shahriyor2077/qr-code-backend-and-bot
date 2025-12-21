const Moderator = require('../models/Moderator');

const login = async (req, res) => {
  const { username, password } = req.body;
  const mod = await Moderator.findOne({ username });
  
  if (!mod || !(await mod.comparePassword(password))) {
    return res.status(401).json({ error: 'Login yoki parol xato' });
  }
  
  req.session.moderatorId = mod._id;
  res.json({ success: true, name: mod.name });
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true });
};

const checkAuth = async (req, res) => {
  const mod = await Moderator.findById(req.session.moderatorId);
  res.json({ authenticated: true, name: mod.name });
};

module.exports = { login, logout, checkAuth };
