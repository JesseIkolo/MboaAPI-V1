const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const businessMiddleware = require('../middlewares/business.middleware');

// Routes publiques
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Routes protégées (admin uniquement)
router.post(
    '/',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.createCategory
);

router.put(
    '/:id',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.updateCategory
);

router.delete(
    '/:id',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.deleteCategory
);

// Routes pour les sous-catégories
router.post(
    '/:id/subcategories',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.addSubCategory
);

router.put(
    '/:id/subcategories/:subId',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.updateSubCategory
);

router.delete(
    '/:id/subcategories/:subId',
    authMiddleware,
    businessMiddleware.isAdmin,
    categoryController.deleteSubCategory
);

module.exports = router; 