const express = require('express');
const router = express.Router();
const businessEventPageController = require('../controllers/businessEventPage.controller');
const { authMiddleware, isBusinessPageOwnerOrAdmin } = require('../middlewares/auth.middleware');

// Lister toutes les pages
router.get('/', authMiddleware, businessEventPageController.getAllBusinessEventPages);

// Créer une page BusinessEvent (premium only)
router.post('/', authMiddleware, businessEventPageController.createBusinessEventPage);
// Récupérer une page BusinessEvent
router.get('/:id', businessEventPageController.getBusinessEventPage);
// Ajouter un événement à une page BusinessEvent
router.post('/:id/events', authMiddleware, isBusinessPageOwnerOrAdmin, businessEventPageController.addEventToPage);
// Récupérer les stats d'une page
router.get('/:id/stats', businessEventPageController.getPageStats);

module.exports = router; 