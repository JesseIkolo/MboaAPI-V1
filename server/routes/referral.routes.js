const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referral.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Générer ou récupérer le code de parrainage
router.get('/code', authMiddleware, referralController.getOrCreateReferralCode);
// Enregistrer un clic sur un lien de parrainage
router.get('/click', referralController.registerReferralClick);
// Stats du parrain connecté
router.get('/stats', authMiddleware, referralController.getReferralStats);
// Leaderboard des parrains
router.get('/leaderboard', referralController.getReferralLeaderboard);
// Récompenses du user connecté
router.get('/rewards', authMiddleware, referralController.getUserRewards);
// Récompenses globales (admin)
router.get('/admin/rewards', authMiddleware, referralController.getAllRewards);
// Règles de récompense (admin)
router.post('/admin/reward-rule', authMiddleware, adminMiddleware, referralController.createRewardRule);
router.patch('/admin/reward-rule/:id', authMiddleware, adminMiddleware, referralController.updateRewardRule);
router.get('/reward-rules', authMiddleware, referralController.getRewardRules);

module.exports = router; 