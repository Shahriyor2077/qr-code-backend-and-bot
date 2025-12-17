const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  createUser,
  getAllUsers,
  getUserById,
  addCheck,
  searchUsers,
  getPublicUser
} = require('../controllers/userController');

// Protected routes (login kerak)
router.post('/', requireAuth, createUser);
router.get('/', requireAuth, getAllUsers);
router.get('/search/:query', requireAuth, searchUsers);
router.get('/:id', requireAuth, getUserById);
router.post('/:id/add-check', requireAuth, addCheck);

// Public route (bot uchun)
router.get('/public/:id', getPublicUser);

module.exports = router;
