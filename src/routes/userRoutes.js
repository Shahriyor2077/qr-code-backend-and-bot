const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { createUser, getAllUsers, getUserById, addCheck, searchUsers } = require('../controllers/userController');

router.post('/', requireAuth, createUser);
router.get('/', requireAuth, getAllUsers);
router.get('/search/:query', requireAuth, searchUsers);
router.get('/:id', requireAuth, getUserById);
router.post('/:id/add-check', requireAuth, addCheck);

module.exports = router;
