// --- server.js ---
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerConfig = require('./config/swagger');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const logger = require('./config/logger'); // Ajouter cette ligne
const requestLogger = require('./middlewares/requestLogger'); // Ajouter cette ligne


// Charger les variables d'environnement
dotenv.config();

// Validation des variables d'environnement requises
const requiredEnvVars = ['MONGODB_URI', 'CORS_ORIGIN'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Variables d\'environnement manquantes:', missingEnvVars.join(', '));
    process.exit(1);
}

// Import des routes
const userRoutes = require('./routes/user.routes.js');
const waitlistRoutes = require('./routes/waitlist.routes.js');
const eventRoutes = require('./routes/event.routes.js');
const businessRoutes = require('./routes/business.routes.js');
const businessManagerRoutes = require('./routes/businessManager.routes.js');
const transactionRoutes = require('./routes/transaction.routes.js');
const categoryRoutes = require('./routes/category.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const statsRoutes = require('./routes/stats.routes.js');
const apiRoutes = require('./routes/api');
const businessEventPageRoutes = require('./routes/businessEventPage.routes.js');
const referralRoutes = require('./routes/referral.routes.js');

const app = express();

// Middleware
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 jour
    }
}));

console.log("Les cors sont activées pour :",process.env.CORS_ORIGIN);


const allowedOrigins = process.env.CORS_ORIGIN.split(',').map((o) => o.trim());
const isDev = (process.env.NODE_ENV !== 'production');
const corsConfig = isDev ? {
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204
} : {
    origin: function (origin, callback) {
        // autorise les requêtes sans origin (comme Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204
};
app.use(cors(corsConfig));
// Gérer explicitement les preflight OPTIONS
app.options('*', cors(corsConfig));

// Middleware de logging des requêtes
app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);

// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api', businessManagerRoutes);
app.use('/api', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api', apiRoutes);
app.use('/api/business-event-pages', businessEventPageRoutes);
app.use('/api/referral', referralRoutes);

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
            logger.info(`Server started successfully`, {
                port: PORT,
                environment: process.env.NODE_ENV || 'development',
                timestamp: new Date().toISOString()
            });
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
            console.log(`📚 Documentation API disponible sur http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        logger.error('Server startup error', { error: error.message, stack: error.stack });
        console.error('❌ Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

// Gestion des erreurs globales
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', {
        reasonMessage: reason && reason.message ? reason.message : String(reason),
        reasonStack: reason && reason.stack ? reason.stack : undefined,
        promise
    });
    process.exit(1);
});

// Log du démarrage du serveur


// Démarrer le serveur
startServer();

module.exports = app;
