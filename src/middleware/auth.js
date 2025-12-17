// Auth middleware - login tekshirish
const requireAuth = (req, res, next) => {
  if (req.session.moderatorId) {
    next();
  } else {
    res.status(401).json({ error: 'Login qilish kerak' });
  }
};

module.exports = { requireAuth };
