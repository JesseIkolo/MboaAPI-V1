const { User, PERMISSIONS, ADMIN_ROLES, DEFAULT_PERMISSIONS } = require('../models/user.model');
const logger = require('../config/logger');

// Obtenir la liste des administrateurs en attente de validation
const getPendingAdmins = async (req, res) => {
    try {
        logger.info('\n📥 Récupération des administrateurs en attente');
        const pendingAdmins = await User.find({
            role: { $ne: 'user' },
            isAdminValidated: false,
            adminType: { $ne: ADMIN_ROLES.SUPERADMIN }
        }).select('-password');

        logger.info('✅ Administrateurs en attente récupérés', { count: pendingAdmins.length });
        res.json(pendingAdmins);
    } catch (error) {
        logger.error('❌ Erreur récupération administrateurs en attente', { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Erreur lors de la récupération des administrateurs en attente" });
    }
};

// Valider un compte administrateur avec des permissions personnalisées
const validateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { customPermissions } = req.body;
        logger.info('\n🛂 Validation d\'un administrateur', { adminId, withCustomPermissions: Array.isArray(customPermissions) ? customPermissions.length : 0 });

        const admin = await User.findById(adminId);
        if (!admin) {
            logger.warn('⚠️ Administrateur non trouvé', { adminId });
            return res.status(404).json({ message: "Administrateur non trouvé" });
        }

        if (admin.role === 'user') {
            logger.warn('⚠️ L\'utilisateur n\'est pas un administrateur', { adminId });
            return res.status(400).json({ message: "L'utilisateur n'est pas un administrateur" });
        }

        if (admin.adminType === ADMIN_ROLES.SUPERADMIN) {
            logger.warn('⚠️ Tentative de modification d\'un super administrateur', { adminId });
            return res.status(400).json({ message: "Impossible de modifier les permissions d'un super administrateur" });
        }

        if (admin.isAdminValidated) {
            logger.warn('⚠️ Administrateur déjà validé', { adminId });
            return res.status(400).json({ message: "L'administrateur est déjà validé" });
        }

        // Vérifier que les permissions personnalisées sont valides
        if (customPermissions) {
            const invalidPermissions = customPermissions.filter(
                permission => !Object.values(PERMISSIONS).includes(permission)
            );

            if (invalidPermissions.length > 0) {
                logger.warn('⚠️ Permissions personnalisées invalides', { adminId, invalidPermissions });
                return res.status(400).json({
                    message: "Certaines permissions sont invalides",
                    invalidPermissions
                });
            }

            // Appliquer les permissions personnalisées
            admin.permissions = customPermissions;
        }

        admin.isAdminValidated = true;
        await admin.save();

        logger.info('✅ Administrateur validé avec succès', { adminId });
        res.json({ 
            message: "Compte administrateur validé avec succès",
            admin: {
                ...admin.toObject(),
                password: undefined
            }
        });
    } catch (error) {
        logger.error('❌ Erreur validation administrateur', { message: error.message, stack: error.stack, adminId: req.params?.adminId });
        res.status(500).json({ message: "Erreur lors de la validation de l'administrateur" });
    }
};

// Révoquer un administrateur
const revokeAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        logger.info('\n🚫 Révocation d\'un administrateur', { adminId });

        const admin = await User.findById(adminId);
        if (!admin) {
            logger.warn('⚠️ Administrateur non trouvé (révocation)', { adminId });
            return res.status(404).json({ message: "Administrateur non trouvé" });
        }

        if (admin.role === 'user') {
            logger.warn('⚠️ L\'utilisateur n\'est pas un administrateur (révocation)', { adminId });
            return res.status(400).json({ message: "L'utilisateur n'est pas un administrateur" });
        }

        if (admin.adminType === ADMIN_ROLES.SUPERADMIN) {
            logger.warn('⚠️ Tentative de révocation d\'un super administrateur', { adminId });
            return res.status(400).json({ message: "Impossible de révoquer un super administrateur" });
        }

        admin.isAdminValidated = false;
        await admin.save();

        logger.info('✅ Administrateur révoqué avec succès', { adminId });
        res.json({ message: "Accès administrateur révoqué avec succès" });
    } catch (error) {
        logger.error('❌ Erreur révocation administrateur', { message: error.message, stack: error.stack, adminId: req.params?.adminId });
        res.status(500).json({ message: "Erreur lors de la révocation de l'administrateur" });
    }
};

// Obtenir la liste de tous les administrateurs
const getAllAdmins = async (req, res) => {
    try {
        logger.info('\n📋 Récupération de tous les administrateurs');
        const admins = await User.find({
            role: { $ne: 'user' }
        }).select('-password');

        logger.info('✅ Administrateurs récupérés', { count: admins.length });
        res.json(admins);
    } catch (error) {
        logger.error('❌ Erreur récupération administrateurs (tous)', { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Erreur lors de la récupération des administrateurs" });
    }
};

// Mettre à jour les permissions d'un administrateur
const updateAdminPermissions = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { permissions } = req.body;
        logger.info('\n🔧 Mise à jour des permissions administrateur', { adminId, permissionsCount: Array.isArray(permissions) ? permissions.length : 0 });

        const admin = await User.findById(adminId);
        if (!admin) {
            logger.warn('⚠️ Administrateur non trouvé (update permissions)', { adminId });
            return res.status(404).json({ message: "Administrateur non trouvé" });
        }

        if (admin.role === 'user') {
            logger.warn('⚠️ L\'utilisateur n\'est pas un administrateur (update permissions)', { adminId });
            return res.status(400).json({ message: "L'utilisateur n'est pas un administrateur" });
        }

        if (admin.adminType === ADMIN_ROLES.SUPERADMIN) {
            logger.warn('⚠️ Tentative de modification d\'un super administrateur (update permissions)', { adminId });
            return res.status(400).json({ message: "Impossible de modifier les permissions d'un super administrateur" });
        }

        // Vérifier que les permissions sont valides
        const invalidPermissions = permissions.filter(
            permission => !Object.values(PERMISSIONS).includes(permission)
        );

        if (invalidPermissions.length > 0) {
            logger.warn('⚠️ Permissions invalides (update permissions)', { adminId, invalidPermissions });
            return res.status(400).json({
                message: "Certaines permissions sont invalides",
                invalidPermissions
            });
        }

        admin.permissions = permissions;
        await admin.save();

        logger.info('✅ Permissions administrateur mises à jour', { adminId, permissionsCount: permissions.length });
        res.json({ 
            message: "Permissions mises à jour avec succès",
            admin: {
                ...admin.toObject(),
                password: undefined
            }
        });
    } catch (error) {
        logger.error('❌ Erreur mise à jour permissions', { message: error.message, stack: error.stack, adminId: req.params?.adminId });
        res.status(500).json({ message: "Erreur lors de la mise à jour des permissions" });
    }
};

// Obtenir la liste des permissions disponibles
const getAvailablePermissions = async (req, res) => {
    try {
        logger.info('\n📖 Récupération des permissions disponibles');
        const payload = {
            permissions: PERMISSIONS,
            adminRoles: ADMIN_ROLES,
            defaultPermissions: DEFAULT_PERMISSIONS
        };
        logger.info('✅ Permissions disponibles récupérées', {
            permissionsCount: Object.keys(PERMISSIONS || {}).length,
            rolesCount: Object.keys(ADMIN_ROLES || {}).length,
            defaultCount: (DEFAULT_PERMISSIONS || []).length
        });
        res.json(payload);
    } catch (error) {
        logger.error('❌ Erreur récupération permissions disponibles', { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Erreur lors de la récupération des permissions disponibles" });
    }
};

module.exports = {
    getPendingAdmins,
    validateAdmin,
    revokeAdmin,
    getAllAdmins,
    updateAdminPermissions,
    getAvailablePermissions
}; 