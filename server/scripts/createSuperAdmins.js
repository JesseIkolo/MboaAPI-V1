require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user.model');
const { PERMISSIONS, ADMIN_ROLES } = require('../models/user.model');

// Vérification des variables d'environnement
if (!process.env.MONGODB_URI) {
    console.error('Erreur: MONGODB_URI n\'est pas défini dans le fichier .env');
    process.exit(1);
}

// Configuration de la connexion MongoDB avec gestion d'erreur
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
        process.exit(1);
    });

// Schéma pour le Super Admin
const superAdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'SUPER_ADMIN' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    lockCount: { type: Number, default: 0 },
    accountLocked: { type: Boolean, default: false }
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

// Fonction sécurisée pour hasher le mot de passe
async function secureHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // S'assurer que le hash est compatible avec la méthode de comparaison de l'API
    const testHash = await bcrypt.hash(password, hash.slice(0, 29));
    return testHash;
}

// Données des super administrateurs
const superAdmins = [
    {
        username: "superadmin1",
        email: "admin1@mboaevents.com",
        phone: "+237600000000",
        password: "SuperAdmin1@123",
        firstName: "Super1",
        lastName: "Admin1"
    },
    {
        username: "superadmin2",
        email: "admin2@mboaevents.com",
        phone: "+237600000001",
        password: "SuperAdmin2@123",
        firstName: "Super2",
        lastName: "Admin2"
    },
    {
        username: "superadmin3",
        email: "admin3@mboaevents.com",
        phone: "+237600000002",
        password: "SuperAdmin3@123",
        firstName: "Super3",
        lastName: "Admin3"
    }
];

// Fonction pour créer les super administrateurs
async function createSuperAdmins() {
    try {
        for (const adminData of superAdmins) {
            // Vérifier si l'admin existe déjà
            const existingAdmin = await User.findOne({ email: adminData.email });
            if (existingAdmin) {
                console.log(`Super Admin existe déjà : ${adminData.email}`);
                continue;
            }

            // Hasher le mot de passe de manière sécurisée
            const hashedPassword = await bcrypt.hash(adminData.password, 10);

            // Créer le super admin avec toutes les permissions
            const superAdmin = new User({
                ...adminData,
                password: hashedPassword,
                role: 'superadmin',
                adminType: 'superadmin',
                isVerified: true,
                status: 'active',
                isActive: true,
                emailVerified: true,
                phoneVerified: true,
                accountVerified: true,
                isAdminValidated: true,
                permissions: Object.values(PERMISSIONS)
            });

            // Sauvegarder dans la base de données
            await superAdmin.save();
            console.log(`Super Admin créé avec succès : ${adminData.email}`);
        }

        console.log('Opération terminée !');
    } catch (error) {
        console.error('Erreur lors de la création des super administrateurs:', error);
    } finally {
        // Fermer la connexion à la base de données
        await mongoose.connection.close();
        console.log('Connexion à la base de données fermée');
    }
}

// Exécuter la fonction
createSuperAdmins();