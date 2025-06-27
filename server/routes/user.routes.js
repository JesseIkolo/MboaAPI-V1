// --- routes/user.routes.js ---
const express = require('express');
const {
  register,
  login,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword,
  verifyEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getCurrentUser,
  createSuperUser
} = require('../controllers/user.controller.js');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

// --- Routes publiques ---
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);

// --- Routes protégées ---
router.get('/me', authMiddleware, (req, res) => {
  console.log('ROUTE /me appelée, req.user =', req.user);
  getCurrentUser(req, res);
});
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

// Route pour permettre à un utilisateur de suivre un autre utilisateur
router.post('/follow/:userId', authMiddleware, followUser);

// Route pour permettre à un utilisateur d'arrêter de suivre un autre utilisateur
router.post('/unfollow/:userId', authMiddleware, unfollowUser);

// Route pour créer un super utilisateur (superadmin)
router.post('/superuser', adminMiddleware, createSuperUser);

module.exports = router;