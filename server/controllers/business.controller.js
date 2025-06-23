const Business = require('../models/business.model');
const User = require('../models/user.model');
const Event = require('../models/event.model');

// Créer un nouveau business
exports.createBusiness = async (req, res) => {
    try {
        const { userId, companyName, subscriptionType } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier si l'utilisateur est déjà business
        const existingBusiness = await Business.findOne({ userId });
        if (existingBusiness) {
            return res.status(400).json({ message: "Cet utilisateur est déjà business" });
        }

        // Calculer les dates d'abonnement
        const startDate = new Date();
        const endDate = new Date();
        if (subscriptionType === 'monthly') {
            endDate.setMonth(endDate.getMonth() + 1);
        } else {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const business = new Business({
            userId,
            companyName,
            subscriptionType,
            subscriptionStartDate: startDate,
            subscriptionEndDate: endDate
        });

        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir tous les business
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate('userId', 'name email');
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un business par ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate('userId', 'name email');
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un business
exports.updateBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un business
exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }
        res.status(200).json({ message: "Business supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vérifier le statut de business
exports.verifyBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        business.isVerified = true;
        await business.save();
        res.status(200).json({ message: "Business vérifié avec succès", business });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les événements d'un business
exports.getBusinessEvents = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        const events = await Event.find({ 
            createdBy: business.userId,
            isPublic: true
        });
        
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 