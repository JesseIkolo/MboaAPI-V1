// --- routes/event.routes.js ---
const express = require('express');
const router = express.Router();
const { authMiddleware, isEventOwnerOrAdmin } = require('../middlewares/auth.middleware');
const eventController = require('../controllers/event.controller');

// Route pour créer un nouvel événement (nécessite une authentification)
router.post('/', authMiddleware, eventController.createEvent);

// Route pour récupérer tous les événements
router.get('/', eventController.getAllEvents);

// Route pour récupérer un événement par ID
router.get('/:id', eventController.getEventById);

// Route pour mettre à jour un événement par ID (nécessite une authentification)
router.put('/:id', authMiddleware, isEventOwnerOrAdmin, eventController.updateEvent);

// Route pour supprimer un événement par ID (nécessite une authentification)
router.delete('/:id', authMiddleware, isEventOwnerOrAdmin, eventController.deleteEvent);

// Modération des événements (admin/modérateur)
router.get('/moderation/pending', authMiddleware, eventController.getPendingModerationEvents);
router.patch('/:id/moderate', authMiddleware, eventController.moderateEvent);
// Promotion d'un événement
router.patch('/:id/promote', authMiddleware, eventController.promoteEvent);
// Incrémenter les vues/interactions
router.patch('/:id/view', eventController.incrementEventView);
router.patch('/:id/interaction', eventController.incrementEventInteraction);

module.exports = router;
