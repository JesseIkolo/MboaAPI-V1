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
  createSuperUser,
  blockUser,
  unblockUser,
  sendConfirmation
} = require('../controllers/user.controller.js');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware.js');
const { isSuperAdmin } = require('../middlewares/adminValidation.middleware');

const router = express.Router();

// --- Routes publiques ---
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);

// Route de test SMTP (pour débogage)
router.get('/test-smtp', async (req, res) => {
    try {
        const { testSMTPConnection } = require('../services/email.service');
        const result = await testSMTPConnection();
        
        if (result) {
            res.json({ 
                success: true, 
                message: 'Test SMTP réussi',
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Test SMTP échoué',
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('❌ Erreur test SMTP:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors du test SMTP',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

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

// Route pour bloquer un utilisateur (superadmin uniquement)
router.post('/block/:userId', authMiddleware, isSuperAdmin, blockUser);

// Route pour débloquer un utilisateur (superadmin uniquement)
router.post('/unblock/:userId', authMiddleware, isSuperAdmin, unblockUser);

router.post('/send-confirmation', sendConfirmation);

module.exports = router;