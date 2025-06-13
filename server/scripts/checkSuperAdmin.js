const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function checkSuperAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connecté à MongoDB');

        const superAdmin = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
        
        if (!superAdmin) {
            console.log('Super admin non trouvé dans la base de données');
            return;
        }

        console.log('Super admin trouvé:');
        console.log({
            email: superAdmin.email,
            username: superAdmin.username,
            role: superAdmin.role,
            adminType: superAdmin.adminType,
            isVerified: superAdmin.isVerified,
            isActive: superAdmin.isActive,
            isAdminValidated: superAdmin.isAdminValidated,
            status: superAdmin.status,
            loginAttempts: superAdmin.loginAttempts,
            lockUntil: superAdmin.lockUntil,
            accountLocked: superAdmin.accountLocked,
            permissions: superAdmin.permissions
        });

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Déconnecté de MongoDB');
    }
}

checkSuperAdmin(); 