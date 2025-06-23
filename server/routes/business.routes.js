const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const businessMiddleware = require('../middlewares/business.middleware');

// Routes publiques
router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.get('/:id/events', businessController.getBusinessEvents);

// Routes protégées (nécessitent une authentification)
router.post('/', authMiddleware, businessController.createBusiness);
router.put('/:id', authMiddleware, businessMiddleware.isBusinessOrAdmin, businessController.updateBusiness);
router.delete('/:id', authMiddleware, businessMiddleware.isAdmin, businessController.deleteBusiness);
router.patch('/:id/verify', authMiddleware, businessMiddleware.isAdmin, businessController.verifyBusiness);

module.exports = router; 