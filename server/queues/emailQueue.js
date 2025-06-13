const Queue = require('bull');
const nodemailer = require('nodemailer');

// Créer une nouvelle file d'attente avec des limites plus strictes
const emailQueue = new Queue('email', {
    redis: {
        host: 'localhost',
        port: 6379,
    },
    limiter: {
        max: 1, // Un seul email à la fois
        duration: 30000 // Attendre 30 secondes entre chaque email
    },
    defaultJobOptions: {
        attempts: 5, // Augmenter le nombre de tentatives
        backoff: {
            type: 'exponential',
            delay: 60000 // Commencer avec 1 minute de délai
        },
        removeOnComplete: 100, // Garder les 100 derniers jobs complétés
        removeOnFail: 100 // Garder les 100 derniers jobs échoués
    }
});

// Configuration du transporteur d'email avec des timeouts plus longs
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    pool: true, // Utiliser un pool de connexions
    maxConnections: 1, // Une seule connexion à la fois
    maxMessages: 1, // Un seul message par connexion
    rateDelta: 30000, // 30 secondes entre chaque email
    rateLimit: 1, // Limite d'un email par rateDelta
    timeout: 30000 // Timeout de 30 secondes
});

// Traitement des jobs d'email
emailQueue.process(async (job) => {
    const { to, subject, html } = job.data;
    
    try {
        // Ajouter un délai aléatoire entre 1 et 5 secondes
        await new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000));

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Mboa Events" <noreply@mboaevents.com>',
            to,
            subject,
            html,
            headers: {
                'X-Priority': '3', // Priorité normale
                'X-MSMail-Priority': 'Normal'
            }
        });

        console.log('Email envoyé:', info.messageId);
        return info;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        
        // Si l'erreur est liée à la fréquence, attendre plus longtemps
        if (error.message.includes('too frequently')) {
            await new Promise(resolve => setTimeout(resolve, 60000)); // Attendre 1 minute
        }
        
        throw error;
    }
});

// Gestion des erreurs avec plus de détails
emailQueue.on('error', (error) => {
    console.error('Erreur dans la file d\'attente des emails:', error);
});

emailQueue.on('failed', (job, error) => {
    console.error(`Job ${job.id} a échoué (tentative ${job.attemptsMade}/${job.opts.attempts}):`, error);
    console.error('Données du job:', job.data);
});

emailQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} complété avec succès après ${job.attemptsMade} tentative(s)`);
});

emailQueue.on('stalled', (job) => {
    console.warn(`Job ${job.id} est bloqué et sera réessayé`);
});

// Fonction pour ajouter un email à la file d'attente
const addEmailToQueue = async (to, subject, html, options = {}) => {
    try {
        const job = await emailQueue.add({
            to,
            subject,
            html
        }, {
            priority: options.priority || 3, // Priorité normale par défaut
            attempts: options.attempts || 5,
            backoff: {
                type: 'exponential',
                delay: 60000 // Commencer avec 1 minute de délai
            },
            ...options
        });

        console.log(`Email ajouté à la file d'attente, job ID: ${job.id}`);
        return job;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'email à la file d\'attente:', error);
        throw error;
    }
};

// Fonction pour obtenir les statistiques de la file d'attente
const getQueueStats = async () => {
    const [waiting, active, completed, failed] = await Promise.all([
        emailQueue.getWaitingCount(),
        emailQueue.getActiveCount(),
        emailQueue.getCompletedCount(),
        emailQueue.getFailedCount()
    ]);

    return {
        waiting,
        active,
        completed,
        failed
    };
};

module.exports = {
    emailQueue,
    addEmailToQueue,
    getQueueStats
}; 