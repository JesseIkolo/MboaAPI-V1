const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testSuperAdminLogin() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connecté à MongoDB');

        // Rechercher le super admin
        const superAdmin = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
        
        if (!superAdmin) {
            console.log('Super admin non trouvé');
            return;
        }

        // Vérifier les détails du compte
        console.log('\nDétails du compte super admin:');
        console.log({
            username: superAdmin.username,
            email: superAdmin.email,
            role: superAdmin.role,
            status: superAdmin.status,
            isVerified: superAdmin.isVerified,
            isActive: superAdmin.isActive,
            isAdminValidated: superAdmin.isAdminValidated,
            lastLogin: superAdmin.lastLogin,
            createdAt: superAdmin.createdAt
        });

        // Vérifier les permissions
        console.log('\nPermissions du super admin:');
        console.log(superAdmin.permissions);

        // Tester la connexion avec le mot de passe
        const isPasswordValid = await superAdmin.comparePassword(process.env.SUPER_ADMIN_PASSWORD);
        console.log('\nTest de mot de passe:', isPasswordValid ? '✅ Réussi' : '❌ Échoué');

        if (isPasswordValid) {
            console.log('\nTest de connexion complet réussi !');
            console.log('\nIdentifiants de connexion:');
            console.log('Email:', process.env.SUPER_ADMIN_EMAIL);
            console.log('Username:', process.env.SUPER_ADMIN_USERNAME);
            console.log('Mot de passe:', process.env.SUPER_ADMIN_PASSWORD);
        } else {
            console.log('\nTest de connexion échoué - Mot de passe incorrect');
        }

    } catch (error) {
        console.error('Erreur lors du test de connexion:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDéconnecté de MongoDB');
    }
}

// Exécuter le test
testSuperAdminLogin(); 