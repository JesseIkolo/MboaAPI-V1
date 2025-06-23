const BusinessEventPage = require('../models/businessEventPage.model');
const User = require('../models/user.model');
const Event = require('../models/event.model');
const Transaction = require('../models/transaction.model');

// Créer une page BusinessEvent (premium only)
const createBusinessEventPage = async (req, res) => {
  try {
    const { name, description, logo, category, location, audienceTargeting, subscriptionId } = req.body;
    const ownerId = req.user.userId;
    // Vérifier que l'utilisateur est premium
    const user = await User.findById(ownerId);
    if (!user || !user.isPremium) {
      return res.status(403).json({ message: "Seuls les utilisateurs premium peuvent créer une page BusinessEvent." });
    }
    // Vérifier l'abonnement
    const subscription = await Transaction.findById(subscriptionId);
    if (!subscription || subscription.status !== 'completed') {
      return res.status(400).json({ message: "Abonnement non valide ou inactif." });
    }
    // Créer la page
    const page = await BusinessEventPage.create({
      owner: ownerId,
      subscription: subscriptionId,
      name,
      description,
      logo,
      category,
      location,
      audienceTargeting
    });
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les pages (avec pagination)
const getAllBusinessEventPages = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const pages = await BusinessEventPage.find()
            .populate('owner', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const total = await BusinessEventPage.countDocuments();

        res.json({
            items: pages,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des pages', error: error.message });
    }
};

// Récupérer une page BusinessEvent
const getBusinessEventPage = async (req, res) => {
  try {
    const page = await BusinessEventPage.findById(req.params.id).populate('owner', 'username email').populate('events');
    if (!page) return res.status(404).json({ message: "Page non trouvée" });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un événement à une page BusinessEvent
const addEventToPage = async (req, res) => {
  try {
    const page = await BusinessEventPage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page non trouvée" });
    // Créer l'événement lié à la page
    const { nom, description, ...eventData } = req.body;
    const event = await Event.create({
      ...eventData,
      nom,
      description,
      createdBy: page._id,
      visibility: 'public'
    });
    page.events.push(event._id);
    await page.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les stats d'une page
const getPageStats = async (req, res) => {
  try {
    const page = await BusinessEventPage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page non trouvée" });
    res.json(page.stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createBusinessEventPage,
    getAllBusinessEventPages,
    getBusinessEventPage,
    addEventToPage,
    getPageStats,
}; 