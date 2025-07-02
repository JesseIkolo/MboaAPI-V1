// --- controllers/user.controller.js ---
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateOTP } = require('../services/otp.service.js');
const {
  sendEmailValidation,
  sendOTPByEmail,
  sendOTPBySMS,
  sendOTPByWhatsApp,
  checkWhatsAppNumber,
  sendWelcomeEmail,
  sendUnifiedWelcomeEmail
} = require('../services/email.service.js');
const referralController = require('./referral.controller');
const OTPService = require('../services/otp.service');

function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push("doit contenir au moins 8 caractères");
  if (!/[A-Z]/.test(password)) errors.push("doit contenir au moins une lettre majuscule");
  if (!/[a-z]/.test(password)) errors.push("doit contenir au moins une lettre minuscule");
  if (!/[0-9]/.test(password)) errors.push("doit contenir au moins un chiffre");
  return errors;
}

// Fonction utilitaire pour générer un token de validation d'email
const generateEmailToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const register = async (req, res) => {
  const { username, email, phone, password, firstName, lastName } = req.body;
  
  console.log('🚀 DÉBUT REGISTER - Données reçues:', {
    username,
    email,
    phone,
    firstName,
    lastName,
    passwordLength: password?.length
  });
  
  try {
    // Vérification qu'au moins email ou téléphone est présent
    if (!email && !phone) {
      return res.status(400).json({ message: 'Veuillez renseigner au moins un email ou un numéro de téléphone.' });
    }

    console.log('🔍 Validation du mot de passe...');
    const passwordIssues = validatePassword(password);
    if (passwordIssues.length > 0) {
      console.log('❌ Mot de passe invalide:', passwordIssues);
      return res.status(400).json({
        message: "Le mot de passe est trop faible",
        reasons: passwordIssues
      });
    }
    console.log('✅ Mot de passe valide');

    console.log('🔍 Vérification d\'unicité...');
    const existingUser = await User.findOne({ $or: [{ email }, { phone }, { username }] });
    if (existingUser) {
      console.log('❌ Utilisateur existant trouvé:', {
        existingEmail: existingUser.email,
        existingPhone: existingUser.phone,
        existingUsername: existingUser.username
      });
      return res.status(400).json({ message: 'Utilisateur existant (email, téléphone ou pseudo).' });
    }
    console.log('✅ Aucun utilisateur existant trouvé');

    console.log('🔐 Sécurisation des données...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const emailToken = generateEmailToken();
    
    console.log('✅ Données sécurisées:', {
      otp,
      otpExpires,
      emailTokenLength: emailToken.length
    });

    console.log('👤 Création de l\'utilisateur...');
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      firstName,
      lastName,
      otp,
      otpExpires,
      emailToken,
      isVerified: false,
      emailVerified: false
    });

    console.log('💾 Sauvegarde en base de données...');
    await newUser.save();
    console.log('✅ Utilisateur sauvegardé avec ID:', newUser._id);

    console.log('🎯 Association parrainage...');
    try {
      await referralController.associateReferralOnSignup(newUser, req);
      console.log('✅ Parrainage associé (ou aucun parrainage)');
    } catch (referralError) {
      console.log('⚠️ Erreur parrainage (non bloquante):', referralError.message);
    }

    // Envoi OTP par SMS ou email
    let otpSent = false;
    let smsError = null;
    let emailError = null;
    let otpChannel = null;
    if (phone && email) {
      // Essayer SMS d'abord
      try {
        await OTPService.createAndSendOTP({ phone });
        otpSent = true;
        otpChannel = 'sms';
        console.log('✅ OTP envoyé par SMS');
      } catch (err) {
        smsError = err;
        // Essayer email si SMS échoue
        try {
          await OTPService.createAndSendOTP({ email });
          otpSent = true;
          otpChannel = 'email';
          console.log('✅ OTP envoyé par email (après échec SMS)');
        } catch (err2) {
          emailError = err2;
        }
      }
    } else if (phone) {
      try {
        await OTPService.createAndSendOTP({ phone });
        otpSent = true;
        otpChannel = 'sms';
        console.log('✅ OTP envoyé par SMS');
      } catch (err) {
        smsError = err;
      }
    } else if (email) {
      try {
        await OTPService.createAndSendOTP({ email });
        otpSent = true;
        otpChannel = 'email';
        console.log('✅ OTP envoyé par email');
      } catch (err) {
        emailError = err;
      }
    }
    if (!otpSent) {
      return res.status(500).json({ message: "Impossible d'envoyer le code OTP par SMS ou email. Veuillez réessayer ou contacter le support." });
    }

    // Envoi d'un seul email de bienvenue avec OTP et lien de validation
    if (email) {
      try {
        await sendUnifiedWelcomeEmail(email, {
          firstName,
          lastName,
          otp,
          emailToken
        });
        console.log('✅ Email de bienvenue/OTP/validation envoyé');
      } catch (welcomeError) {
        console.error('❌ Erreur envoi email de bienvenue/OTP/validation:', welcomeError.message);
        // Ne pas bloquer l'inscription pour cette erreur
      }
    }

    console.log('✅ REGISTER TERMINÉ AVEC SUCCÈS');
    res.status(201).json({
      message: 'Inscription réussie',
      user: {
        _id: newUser._id,
        email: newUser.email,
        phone: newUser.phone,
        isVerified: newUser.isVerified
      },
      otpChannel
    });
  } catch (err) {
    console.error('❌ REGISTER ERROR:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code
    });
    res.status(500).json({ message: "Erreur serveur à l'inscription" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET non défini');
      return res.status(500).json({ message: 'Erreur de configuration du serveur' });
    }

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifiant et mot de passe requis' });
    }

    console.log('👤 Tentative de connexion avec:', identifier);
    console.log('🔑 Mot de passe fourni:', password);

    // Recherche de l'utilisateur par email, username ou téléphone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier },
        { phone: identifier }
      ]
    });
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', identifier);
      return res.status(400).json({ message: 'Identifiant invalide' });
    }

    console.log('✅ Utilisateur trouvé:', {
      email: user.email,
      username: user.username,
      role: user.role,
      hashedPassword: user.password
    });

    if (!user.password) {
      console.log('❌ Utilisateur sans mot de passe:', identifier);
      return res.status(400).json({ message: 'Compte invalide' });
    }

    console.log('🔍 Vérification du mot de passe pour:', identifier);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Résultat de la comparaison:', isMatch);

    if (!isMatch) {
      console.log('❌ Mot de passe incorrect pour:', identifier);
      
      // Incrémenter les tentatives de connexion
      if (user.incrementLoginAttempts) {
        const isLocked = await user.incrementLoginAttempts();
        if (isLocked) {
          return res.status(403).json({ 
            message: 'Compte temporairement bloqué après trop de tentatives. Veuillez réessayer plus tard.' 
          });
        }
      }
      
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Vérifier si le compte est verrouillé
    if (user.isLocked && user.isLocked()) {
      console.log('🔒 Compte bloqué pour:', identifier);
      return res.status(403).json({ 
        message: 'Compte temporairement bloqué. Veuillez réessayer plus tard.',
        lockUntil: user.lockUntil
      });
    }

    // Réinitialiser les tentatives de connexion en cas de succès
    if (user.resetLoginAttempts) {
      await user.resetLoginAttempts();
    }

    console.log('✅ Connexion réussie pour:', identifier);

    // Créer la session utilisateur
    req.session.user = {
      _id: user._id,
        role: user.role || 'user',
        adminType: user.adminType,
        isAdminValidated: user.isAdminValidated || false,
      permissions: user.permissions || [],
      email: user.email,
      username: user.username
    };
    
    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, adminType: user.adminType },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    );
    
    res.json({ 
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role || 'user',
        adminType: user.adminType,
        isAdminValidated: user.isAdminValidated || false,
        permissions: user.permissions || []
      },
      token
    });
  } catch (err) {
    console.error('❌ LOGIN ERROR:', err.message || err);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la connexion',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

const sendOTP = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  const isWhatsapp = await checkWhatsAppNumber(phone);

  
  if (isWhatsapp) {
    await sendOTPByWhatsApp(phone, otp);
  } else {
    await sendOTPBySMS(phone, otp);
  } 
 
  await sendOTPByEmail(user.email, otp);
  res.json({ message: 'OTP envoyé.' });
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('Tentative de vérification OTP:', { email, otp });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé:', email);
      return res.status(400).json({ message: 'OTP invalide ou expiré' });
    }

    console.log('État OTP utilisateur:', {
      userOTP: user.otp,
      otpExpires: user.otpExpires,
      currentTime: new Date()
    });

    if (!user.otp || !user.otpExpires) {
      console.log('Pas d\'OTP trouvé pour l\'utilisateur');
      return res.status(400).json({ message: 'OTP invalide ou expiré' });
    }

    if (user.otpExpires < new Date()) {
      console.log('OTP expiré');
      return res.status(400).json({ message: 'OTP invalide ou expiré' });
    }

    if (user.otp !== otp) {
      console.log('OTP incorrect');
      return res.status(400).json({ message: 'OTP invalide ou expiré' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    console.log('Vérification OTP réussie pour:', email);
    res.json({ 
      message: 'Vérification réussie',
      user: {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification OTP:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification de l\'OTP' });
  }
};

const resetPassword = async (req, res) => {
  const { phone, otp, newPassword } = req.body;
  const user = await User.findOne({ phone });
  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ message: 'OTP invalide ou expiré' });
  }

  const passwordIssues = validatePassword(newPassword);
  if (passwordIssues.length > 0) {
    return res.status(400).json({ message: 'Mot de passe invalide', reasons: passwordIssues });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  res.json({ message: 'Mot de passe réinitialisé' });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ emailToken: token });
  if (!user) return res.status(400).json({ message: 'Token invalide' });
  user.emailVerified = true;
  user.emailToken = null;
  await user.save();
  res.json({ message: 'Email vérifié avec succès' });
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json(user);
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const passwordIssues = validatePassword(updates.password);
      if (passwordIssues.length > 0) {
        return res.status(400).json({ message: "Mot de passe invalide", reasons: passwordIssues });
      }
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json({ message: 'Utilisateur supprimé' });
};

// Fonction pour permettre à un utilisateur de suivre un autre utilisateur
const followUser = async (req, res) => {
    try {
        const userId = req.user.userId; // L'utilisateur qui fait la demande
        const userToFollowId = req.params.userId; // L'utilisateur à suivre

        // Vérifier si l'utilisateur à suivre existe
        const userToFollow = await User.findById(userToFollowId);
        if (!userToFollow) {
            return res.status(404).json({ message: 'Utilisateur à suivre non trouvé.' });
        }

        // Vérifier si l'utilisateur courant existe
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'Utilisateur courant non trouvé.' });
        }

        // Vérifier si l'utilisateur ne se suit pas lui-même
        if (userId === userToFollowId) {
            return res.status(400).json({ message: 'Vous ne pouvez pas vous suivre vous-même.' });
        }

        // Vérifier si l'utilisateur ne suit pas déjà l'utilisateur à suivre
        if (currentUser.following.includes(userToFollowId)) {
            return res.status(400).json({ message: 'Vous suivez déjà cet utilisateur.' });
        }

        // Ajouter l'utilisateur à suivre à la liste des "following" de l'utilisateur courant
        currentUser.following.push(userToFollowId);
        await currentUser.save();

        // Ajouter l'utilisateur courant à la liste des "followers" de l'utilisateur à suivre
        userToFollow.followers.push(userId);
        await userToFollow.save();

        res.status(200).json({ message: 'Utilisateur suivi avec succès.' });
    } catch (error) {
        console.error('Erreur lors du suivi de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors du suivi de l\'utilisateur.', error: error.message });
    }
};

// Fonction pour permettre à un utilisateur d'arrêter de suivre un autre utilisateur
const unfollowUser = async (req, res) => {
    try {
        const userId = req.user.userId; // L'utilisateur qui fait la demande
        const userToUnfollowId = req.params.userId; // L'utilisateur à ne plus suivre

        // Vérifier si l'utilisateur à ne plus suivre existe
        const userToUnfollow = await User.findById(userToUnfollowId);
        if (!userToUnfollow) {
            return res.status(404).json({ message: 'Utilisateur à ne plus suivre non trouvé.' });
        }

        // Vérifier si l'utilisateur courant existe
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'Utilisateur courant non trouvé.' });
        }

        // Vérifier si l'utilisateur ne se suit pas lui-même
        if (userId === userToUnfollowId) {
            return res.status(400).json({ message: 'Vous ne pouvez pas arrêter de vous suivre vous-même.' });
        }

        // Vérifier si l'utilisateur suit déjà l'utilisateur à ne plus suivre
        if (!currentUser.following.includes(userToUnfollowId)) {
            return res.status(400).json({ message: 'Vous ne suivez pas cet utilisateur.' });
        }

        // Retirer l'utilisateur à ne plus suivre de la liste des "following" de l'utilisateur courant
        currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollowId);
        await currentUser.save();

        // Retirer l'utilisateur courant de la liste des "followers" de l'utilisateur à ne plus suivre
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId);
        await userToUnfollow.save();

        res.status(200).json({ message: 'Utilisateur non suivi avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'arrêt du suivi de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de l\'arrêt du suivi de l\'utilisateur.', error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
  try {
    // Utilise userId du JWT si présent, sinon _id de la session
    const userId = req.user.userId || req.user._id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// --- Création d'un super utilisateur (superadmin) ---
const createSuperUser = async (req, res) => {
  const { username, email, phone, password, firstName, lastName } = req.body;
  try {
    // Vérification du mot de passe
    const passwordIssues = validatePassword(password);
    if (passwordIssues.length > 0) {
      return res.status(400).json({
        message: "Le mot de passe est trop faible",
        reasons: passwordIssues
      });
    }

    // Vérifier si un superadmin existe déjà avec cet email, username ou phone
    const existingUser = await User.findOne({ $or: [
      { email }, { phone }, { username }
    ] });
    if (existingUser) return res.status(400).json({ message: 'Super utilisateur existant (email, téléphone ou pseudo).' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSuperUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'superadmin',
      adminType: 'superadmin',
      isVerified: true,
      emailVerified: true,
      isAdminValidated: true,
      status: 'active',
      permissions: [
        'manage_users',
        'manage_partners',
        'manage_ads',
        'manage_events',
        'manage_chats',
        'manage_transactions',
        'manage_categories',
        'validate_admins'
      ]
    });

    await newSuperUser.save();
    res.status(201).json({
      message: 'Super utilisateur créé avec succès.',
      userId: newSuperUser._id
    });
  } catch (err) {
    console.error('❌ CREATE SUPERUSER ERROR:', err.message || err);
    res.status(500).json({ message: 'Erreur serveur à la création du super utilisateur' });
  }
};

const logout = async (req, res) => {
  try {
    // Ajouter le token JWT à la blacklist si présent
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const tokenBlacklistService = require('../services/tokenBlacklist.service');
      await tokenBlacklistService.blacklistToken(token);
    }

    // Détruire la session
    req.session.destroy(err => {
      if (err) {
        console.error('Erreur lors de la destruction de la session:', err);
        return res.status(500).json({ message: 'Impossible de se déconnecter' });
      }
      
      // Supprimer le cookie de session
      res.clearCookie('connect.sid');
      
      // Supprimer d'autres cookies potentiels
      res.clearCookie('sessionId');
      res.clearCookie('authToken');
      
      res.status(200).json({ message: 'Déconnexion réussie' });
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (user.accountLocked) return res.status(400).json({ message: 'Utilisateur déjà bloqué' });
    user.accountLocked = true;
    user.lockUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Bloqué 30 jours par défaut
    await user.save();
    res.json({ message: 'Utilisateur bloqué avec succès', userId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du blocage de l\'utilisateur' });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (!user.accountLocked) return res.status(400).json({ message: 'Utilisateur non bloqué' });
    user.accountLocked = false;
    user.lockUntil = null;
    await user.save();
    res.json({ message: 'Utilisateur débloqué avec succès', userId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du déblocage de l\'utilisateur' });
  }
};

const sendConfirmation = async (req, res) => {
  try {
    const { email } = req.body;
    await sendEmailValidation(email, 'confirmation');
    res.json({ message: 'Email de confirmation envoyé' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email de confirmation" });
  }
};

module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  verifyEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getCurrentUser,
  createSuperUser,
  logout,
  blockUser,
  unblockUser,
  sendConfirmation
};
