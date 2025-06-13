// --- server.js ---
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerConfig = require('./config/swagger');

// Charger les variables d'environnement
dotenv.config();

// Validation des variables d'environnement requises
const requiredEnvVars = ['MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Variables d\'environnement manquantes:', missingEnvVars.join(', '));
    process.exit(1);
}

// Import des routes
const userRoutes = require('./routes/user.routes.js');
const waitlistRoutes = require('./routes/waitlist.routes.js');
const eventRoutes = require('./routes/event.routes.js');
const partnerRoutes = require('./routes/partner.routes.js');
const businessManagerRoutes = require('./routes/businessManager.routes.js');
const transactionRoutes = require('./routes/transaction.routes.js');
const categoryRoutes = require('./routes/category.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const statsRoutes = require('./routes/stats.routes.js');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);

// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api', businessManagerRoutes);
app.use('/api', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api', apiRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: err.message
    });
});

// Configuration du port
const PORT = process.env.PORT || 2103;

// Fonction de démarrage du serveur
const startServer = async () => {
    try {
        // Connexion à MongoDB avec options améliorées
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connecté à MongoDB avec succès');

        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
            console.log(`📚 Documentation API disponible sur http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

// Démarrer le serveur
startServer();

module.exports = app;
