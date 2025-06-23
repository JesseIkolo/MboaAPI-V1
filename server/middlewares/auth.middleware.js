// --- middlewares/auth.middleware.js ---
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const Event = require('../models/event.model');
const BusinessEventPage = require('../models/businessEventPage.model');

const authMiddleware = async (req, res, next) => {
  if (req.session && req.session.user) {
    // L'utilisateur est authentifié via la session
    req.user = req.session.user;
    next();
  } else {
    // Aucune session trouvée
    res.status(401).json({ message: 'Non authentifié. Veuillez vous connecter.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }

  if (req.user.role === 'user') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
  }

  if (!req.user.isAdminValidated && req.user.adminType !== 'superadmin') {
    return res.status(403).json({ message: 'Compte administrateur non validé' });
  }

  next();
};

// Middleware : seul le créateur de l'événement ou un admin peut modifier/supprimer
const isEventOwnerOrAdmin = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id || req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    // Si admin, OK
    if (req.user.role !== 'user') return next();
    // Si créateur (user ou page), OK
    if (event.createdBy?.toString() === req.user._id?.toString()) return next();
    // Si l'événement est lié à une page dont il est propriétaire
    if (event.createdBy && event.createdBy.model === 'BusinessEventPage') {
      const page = await BusinessEventPage.findById(event.createdBy);
      if (page && page.owner.toString() === req.user._id?.toString()) return next();
    }
    return res.status(403).json({ message: 'Accès réservé au créateur ou à un administrateur' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware : seul le propriétaire de la page ou un admin peut modifier/supprimer la page ou ses événements
const isBusinessPageOwnerOrAdmin = async (req, res, next) => {
  try {
    const pageId = req.params.id || req.params.pageId;
    const page = await BusinessEventPage.findById(pageId);
    if (!page) return res.status(404).json({ message: 'Page non trouvée' });
    if (req.user.role !== 'user') return next();
    if (page.owner.toString() === req.user._id?.toString()) return next();
    return res.status(403).json({ message: 'Accès réservé au propriétaire de la page ou à un administrateur' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  isEventOwnerOrAdmin,
  isBusinessPageOwnerOrAdmin
};
