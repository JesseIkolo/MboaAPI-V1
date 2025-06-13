const { addEmailToQueue } = require('../queues/emailQueue');

class EmailService {
    static async sendEmail(to, subject, html) {
        try {
            await addEmailToQueue(to, subject, html);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            throw error;
        }
    }

    static async sendVerificationEmail(user, verificationToken) {
        const subject = 'Vérification de votre compte Mboa Events';
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const html = `
            <h1>Bienvenue sur Mboa Events!</h1>
            <p>Merci de vous être inscrit. Pour vérifier votre compte, veuillez cliquer sur le lien ci-dessous :</p>
            <a href="${verificationLink}">Vérifier mon compte</a>
            <p>Ce lien expirera dans 24 heures.</p>
        `;

        return this.sendEmail(user.email, subject, html);
    }

    static async sendPasswordResetEmail(user, resetToken) {
        const subject = 'Réinitialisation de votre mot de passe Mboa Events';
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const html = `
            <h1>Réinitialisation de mot de passe</h1>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
            <a href="${resetLink}">Réinitialiser mon mot de passe</a>
            <p>Ce lien expirera dans 1 heure.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        `;

        return this.sendEmail(user.email, subject, html);
    }

    // Autres méthodes d'envoi d'email...
}

module.exports = EmailService; 