const express = require('express');
const router = express.Router();
const businessManagerController = require('../controllers/businessManager.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const businessMiddleware = require('../middlewares/business.middleware');

// Routes pour la gestion des Business Managers
router.get(
    '/business/:businessId/managers',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    businessManagerController.getBusinessManagers
);

router.post(
    '/business/:businessId/managers',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    businessManagerController.addBusinessManager
);

router.put(
    '/business/:businessId/managers/:managerId',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    businessManagerController.updateBusinessManagerPermissions
);

router.delete(
    '/business/:businessId/managers/:managerId',
    authMiddleware,
    businessMiddleware.isBusinessOrAdmin,
    businessManagerController.removeBusinessManager
);

module.exports = router; 