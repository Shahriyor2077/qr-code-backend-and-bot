const requireAuth = (req, res, next) => {
  req.session.moderatorId ? next() : res.status(401).json({ error: 'Login qilish kerak' });
};

module.exports = { requireAuth };
