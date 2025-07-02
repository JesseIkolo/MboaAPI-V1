// --- services/email.service.js ---
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration du transporteur SMTP principal
const createTransporter = () => {
    console.log('🔧 createTransporter - Configuration SMTP:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        user: process.env.SMTP_USER,
        fromName: process.env.SMTP_FROM_NAME,
        fromEmail: process.env.SMTP_FROM_EMAIL
    });

    // Vérification des variables d'environnement requises
    const requiredEnvVars = [
        'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS',
        'SMTP_FROM_NAME', 'SMTP_FROM_EMAIL'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        console.error('❌ Variables d\'environnement SMTP manquantes:', missingVars);
        throw new Error(`Variables d'environnement SMTP manquantes: ${missingVars.join(', ')}`);
    }

    const config = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    };

    console.log('🔧 Configuration SMTP finale:', {
        host: config.host,
        port: config.port,
        secure: config.secure,
        authUser: config.auth.user,
        authPassLength: config.auth.pass?.length || 0
    });

    try {
        const transporter = nodemailer.createTransport(config);
        console.log('✅ Transporter nodemailer créé avec succès');
        return transporter;
    } catch (error) {
        console.error('❌ Erreur création transporter:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw error;
    }
};

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    static createTransporter() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    static async sendEmailValidation(email, template) {
        try {
            const transporter = createTransporter();
            
            let subject, html;
            
            if (template === 'waitlist-confirmation') {
                subject = "Bienvenue sur la liste d'attente Mboa Events !";
                html = `
                    <h2>Merci de votre intérêt pour Mboa Events !</h2>
                    <p>Nous sommes ravis de vous confirmer votre inscription sur notre liste d'attente.</p>
                    <p>Vous serez parmi les premiers à être informés du lancement de notre plateforme et à bénéficier d'avantages exclusifs.</p>
                    <p>Nous vous contacterons dès que nous serons prêts à vous accueillir !</p>
                    <p>L'équipe Mboa Events</p>
                `;
            }

            if (email) {
                await transporter.sendMail({
                    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
                    to: email,
                    subject,
                    html
                });
            }

            return true;
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            return false;
        }
    }

    static async sendAccountLockedEmail(user, lockDuration, attempts) {
        try {
            const minutes = Math.floor(lockDuration / (60 * 1000));
            const emailOptions = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: 'Compte temporairement bloqué - MBOA Events',
                html: `
                    <h2>Compte temporairement bloqué</h2>
                    <p>Bonjour ${user.firstName} ${user.lastName},</p>
                    <p>Pour des raisons de sécurité, votre compte a été temporairement bloqué suite à ${attempts} tentatives de connexion échouées.</p>
                    <p>Votre compte sera automatiquement débloqué dans ${minutes} minutes.</p>
                    <p>Si vous n'êtes pas à l'origine de ces tentatives, nous vous recommandons de changer votre mot de passe dès que possible.</p>
                    <p>Cordialement,<br>L'équipe MBOA Events</p>
                `
            };
            const transporter = EmailService.createTransporter();
            const info = await transporter.sendMail(emailOptions);
            console.log('Email de compte bloqué envoyé:', info.messageId);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return false;
        }
    }

    /**
     * Envoie un code OTP par email
     * @param {string} email - Adresse email du destinataire
     * @param {string} otp - Code OTP à envoyer
     * @returns {Promise<boolean>} Succès de l'envoi
     */
    async sendOTPByEmail(email, otp) {
        try {
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: email,
                subject: 'Code de vérification MBOA Events',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Vérification de votre compte MBOA Events</h2>
                        <p>Voici votre code de vérification :</p>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                            <strong>${otp}</strong>
                        </div>
                        <p>Ce code est valable pendant 5 minutes.</p>
                        <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            Ceci est un email automatique, merci de ne pas y répondre.
                        </p>
                    </div>
                `
            };

            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return false;
        }
    }
}

// Fonction pour envoyer l'OTP par email
const sendOTPByEmail = async (email, otp) => {
    console.log('📧 sendOTPByEmail - Début:', { email, otp });
    
    try {
        console.log('📧 Configuration SMTP...');
        const transporter = createTransporter();
        console.log('✅ Transporter créé');
        
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: 'Code de vérification MBOA Events',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Vérification de votre compte MBOA Events</h2>
                    <p>Bonjour,</p>
                    <p>Voici votre code de vérification pour MBOA Events :</p>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                        <strong>${otp}</strong>
                    </div>
                    <p>Ce code est valable pendant 10 minutes.</p>
                    <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</p>
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                        Ceci est un email automatique, merci de ne pas y répondre.
                    </p>
                </div>
            `
        };

        console.log('📧 Options email configurées:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        console.log('📧 Tentative d\'envoi...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email envoyé avec succès:', {
            messageId: info.messageId,
            response: info.response
        });
        return info;
    } catch (error) {
        console.error('❌ Erreur sendOTPByEmail:', {
            message: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response,
            stack: error.stack
        });
        throw new Error(`Erreur lors de l'envoi de l'email OTP: ${error.message}`);
    }
};

// Fonction pour envoyer un email de validation
const sendEmailValidation = async (email, token) => {
    console.log('📧 sendEmailValidation - Début:', { email, tokenLength: token?.length });
    
    try {
        console.log('📧 Configuration SMTP pour validation email...');
        const transporter = createTransporter();
        
        const validationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
        console.log('📧 URL de validation:', validationUrl);
        
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: 'Validez votre email - MBOA Events',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Validation de votre email</h2>
                    <p>Pour finaliser votre inscription, veuillez cliquer sur le lien ci-dessous :</p>
                    <a href="${validationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                        Valider mon email
                    </a>
                    <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
                    <p style="word-break: break-all; color: #666;">${validationUrl}</p>
                </div>
            `
        };

        console.log('📧 Envoi lien de validation...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Lien de validation envoyé:', { messageId: info.messageId });
        return info;
    } catch (error) {
        console.error('❌ Erreur sendEmailValidation:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw new Error(`Erreur lors de l'envoi du lien de validation: ${error.message}`);
    }
};

// Fonction pour envoyer un email de bienvenue
const sendWelcomeEmail = async (email, fullName) => {
    console.log('📧 sendWelcomeEmail - Début:', { email, fullName });
    
    try {
        console.log('📧 Configuration SMTP pour email de bienvenue...');
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: 'Bienvenue sur MBOA Events !',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Bienvenue ${fullName} !</h2>
                    <p>Nous sommes ravis de vous accueillir sur MBOA Events.</p>
                    <p>Votre compte a été créé avec succès. Pour commencer à utiliser la plateforme, veuillez vérifier votre email avec le code OTP que nous venons de vous envoyer.</p>
                    <p>À bientôt sur MBOA Events !</p>
                </div>
            `
        };

        console.log('📧 Envoi email de bienvenue...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email de bienvenue envoyé:', { messageId: info.messageId });
        return info;
    } catch (error) {
        console.error('❌ Erreur sendWelcomeEmail:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw new Error(`Erreur lors de l'envoi de l'email de bienvenue: ${error.message}`);
    }
};

// Fonction de test pour vérifier la configuration email
const testEmailConfiguration = async (testEmail) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: testEmail,
            subject: 'Test de Configuration Email MBOA Events',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Test de Configuration Email</h2>
                    <p>Bonjour,</p>
                    <p>Ceci est un email de test pour vérifier la configuration SMTP de MBOA Events.</p>
                    <p>Si vous recevez cet email, cela signifie que la configuration est correcte.</p>
                    <p>Date et heure du test : ${new Date().toLocaleString()}</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Ceci est un email de test automatique, merci de ne pas y répondre.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email de test envoyé avec succès !');
        console.log('ID du message:', info.messageId);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Erreur lors du test de configuration email:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Fonction de test SMTP pour débogage
const testSMTPConnection = async () => {
    console.log('🧪 TEST SMTP - Début du test de connexion...');
    
    try {
        console.log('🔧 Vérification des variables d\'environnement...');
        const envVars = {
            SMTP_HOST: process.env.SMTP_HOST,
            SMTP_PORT: process.env.SMTP_PORT,
            SMTP_SECURE: process.env.SMTP_SECURE,
            SMTP_USER: process.env.SMTP_USER,
            SMTP_PASS: process.env.SMTP_PASS ? '***' : 'MANQUANT',
            SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
            SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
            CLIENT_URL: process.env.CLIENT_URL
        };
        
        console.log('🔧 Variables d\'environnement:', envVars);
        
        const transporter = createTransporter();
        
        console.log('🧪 Test de vérification SMTP...');
        await transporter.verify();
        console.log('✅ Connexion SMTP réussie !');
        
        return true;
    } catch (error) {
        console.error('❌ Test SMTP échoué:', {
            message: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response,
            stack: error.stack
        });
        return false;
    }
};

/**
 * Envoie un email unique de bienvenue avec OTP et lien de validation
 * @param {string} email - Adresse email du destinataire
 * @param {object} params - { firstName, lastName, otp, emailToken }
 */
const sendUnifiedWelcomeEmail = async (email, { firstName, lastName, otp, emailToken }) => {
    try {
        const transporter = createTransporter();
        const validationUrl = `${process.env.CLIENT_URL || 'http://localhost:5000'}/verify-email?token=${emailToken}`;
        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: 'Bienvenue sur MBOA Events !',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Bienvenue ${firstName} ${lastName} !</h2>
                    <p>Merci de vous être inscrit sur MBOA Events.</p>
                    <p>Voici votre code de vérification (OTP) :</p>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                        <strong>${otp}</strong>
                    </div>
                    <p>Ce code est valable pendant 10 minutes.</p>
                    <p>Pour finaliser votre inscription, veuillez cliquer sur le lien ci-dessous :</p>
                    <a href="${validationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                        Valider mon email
                    </a>
                    <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
                    <p style="word-break: break-all; color: #666;">${validationUrl}</p>
                    <hr>
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                        Ceci est un email automatique, merci de ne pas y répondre.<br>
                        L'équipe MBOA Events
                    </p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de bienvenue/OTP/validation:', error);
        return false;
    }
};

module.exports = {
    sendOTPByEmail,
    sendEmailValidation,
    sendWelcomeEmail,
    createTransporter,
    testSMTPConnection,
    sendUnifiedWelcomeEmail
};