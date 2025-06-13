const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateSuperAdminPassword() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connecté à MongoDB');

        const password = 'Admin123!@#';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Mettre à jour le super admin
        const updatedAdmin = await User.findOneAndUpdate(
            { email: 'admin@mboaevents.com' },
            { 
                $set: {
                    password: hashedPassword,
                    requiresPasswordChange: false,
                    lastPasswordChange: new Date(),
                    loginAttempts: 0,
                    lockUntil: null,
                    accountLocked: false
                }
            },
            { new: true }
        );

        if (updatedAdmin) {
            // Vérifier immédiatement si le nouveau mot de passe fonctionne
            const isMatch = await bcrypt.compare(password, updatedAdmin.password);
            console.log('Mot de passe du super admin mis à jour avec succès pour:', updatedAdmin.email);
            console.log('Test de vérification du mot de passe:', isMatch ? '✅ OK' : '❌ ERREUR');
            console.log('Vous pouvez maintenant vous connecter avec:');
            console.log('Email:', updatedAdmin.email);
            console.log('Mot de passe:', password);
        } else {
            console.log('Super admin non trouvé');
        }

    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Déconnecté de MongoDB');
    }
}

updateSuperAdminPassword(); 