const router = require('express').Router();
const { login, logout, checkAuth } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', requireAuth, checkAuth);

module.exports = router;
