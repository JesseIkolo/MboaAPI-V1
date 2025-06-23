const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const businessMiddleware = require('../middlewares/business.middleware');

// Route pour initier un paiement d'abonnement
router.post(
    '/business/:businessId/subscribe',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    transactionController.initiateSubscriptionPayment
);

// Route pour vérifier le statut d'un paiement
router.get(
    '/transaction/:transactionId/status',
    authMiddleware,
    transactionController.checkPaymentStatus
);

// Route pour obtenir l'historique des transactions d'un partenaire
router.get(
    '/business/:businessId/transactions',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    transactionController.getBusinessTransactions
);

// Webhook pour recevoir les notifications de paiement de Campay
router.post(
    '/webhook/payment',
    transactionController.handlePaymentWebhook
);

module.exports = router; 