const { User, ADMIN_ROLES } = require('../models/user.model');

// Middleware pour vérifier si l'utilisateur est un business ou un admin
exports.isBusinessOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        if (user.role === 'business' || user.role === ADMIN_ROLES.SUPERADMIN) {
            return next();
        }
        return res.status(403).json({ message: "Accès réservé aux business ou aux administrateurs" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la vérification des droits business/admin" });
    }
};

// Middleware pour vérifier si l'utilisateur est un admin
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        if (user.role === ADMIN_ROLES.SUPERADMIN) {
            return next();
        }
        return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la vérification des droits administrateur" });
    }
};

// Middleware pour vérifier si l'utilisateur est le business concerné ou un admin
exports.isBusinessOrAdmin = async (req, res, next) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        if (req.user.role === 'admin' || business.userId.toString() === req.user.id) {
            next();
        } else {
            res.status(403).json({ 
                message: "Accès refusé. Vous devez être le business concerné ou un administrateur." 
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 