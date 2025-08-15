// --- controllers/waitlist.controller.js ---
const Waitlist = require('../models/waitlist.model.js');
const EmailService = require('../services/email.service.js');
const logger = require('../config/logger');

const addToWaitlist = async (req, res) => {
  const { name, email, phone } = req.body;

  logger.info('\n🚀 DÉBUT ADD TO WAITLIST', {
    name,
    email: email || 'Non fourni',
    phone: phone ? '***' : 'Non fourni'
  });

  try {
    // Validations
    if (!name) {
      logger.warn('\n⚠️ Tentative d\'inscription sans nom', {
        email: email || 'Non fourni',
        phone: phone ? '***' : 'Non fourni'
      });
      return res.status(400).json({ message: "Le nom est obligatoire pour l'inscription à la waitlist" });
    }

    if (!email && !phone) {
      logger.warn('\n⚠️ Tentative d\'inscription sans email ni téléphone', { name });
      return res.status(400).json({ message: 'Au moins un email ou un numéro de téléphone est requis' });
    }

    // Requête de recherche dynamique pour éviter les doublons
    let searchQuery = {};
    if (email && phone) {
      searchQuery = { $or: [{ email }, { phone }] };
    } else if (email) {
      searchQuery = { email };
    } else if (phone) {
      searchQuery = { phone };
    }

    logger.debug('\n🔎 Vérification d\'existence dans la waitlist', {
      hasEmail: !!email,
      hasPhone: !!phone
    });
    const exists = await Waitlist.findOne(searchQuery);

    if (exists) {
      logger.warn('\n⚠️ Tentative d\'inscription en double sur la waitlist', {
        email: email || 'Non fourni',
        phone: phone ? '***' : 'Non fourni',
        existingId: exists._id
      });
      return res.status(409).json({ message: 'Déjà inscrit sur la liste' });
    }

    logger.debug('\n✅ Aucune inscription existante trouvée, création de l\'entrée');
    // Assainir les champs: transformer undefined/null/vides en undefined pour éviter les valeurs ""
    const sanitizedEmail = (typeof email === 'string' && email.trim().length > 0) ? email.trim() : undefined;
    const sanitizedPhone = (typeof phone === 'string' && phone.trim().length > 0) ? phone.trim() : undefined;
    const entry = new Waitlist({ name: name && name.trim(), email: sanitizedEmail, phone: sanitizedPhone });
    await entry.save();

    logger.info('\n✅ Nouvelle inscription ajoutée à la waitlist', {
      waitlistId: entry._id,
      name,
      email: email || 'Non fourni',
      phone: phone ? '***' : 'Non fourni'
    });

    // Envoi email de confirmation seulement si email fourni
    if (email) {
      logger.debug('\n📧 Envoi email de confirmation waitlist', { email });
      try {
        await EmailService.sendEmailValidation(email, 'waitlist-confirmation');
        logger.info('\n✅ Email de confirmation waitlist envoyé', { email });
      } catch (emailError) {
        logger.error('\n❌ Erreur envoi email confirmation waitlist', {
          email,
          error: emailError.message
        });
        // Non bloquant
      }
    } else {
      logger.info('\nℹ️ Aucun email fourni, pas d\'envoi de confirmation');
    }

    logger.info('\n✅ ADD TO WAITLIST TERMINÉ AVEC SUCCÈS', {
      waitlistId: entry._id,
      name,
      email: email || 'Non fourni',
      phone: phone ? '***' : 'Non fourni'
    });
    res.status(201).json({ message: "Inscription à la liste d'attente réussie" });
  } catch (err) {
    logger.error('\n❌ ADD TO WAITLIST ERROR', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code,
      requestData: { name, email: email || 'Non fourni', phone: phone ? '***' : 'Non fourni' }
    });
    res.status(500).json({ message: err.message });
  }
};

const getWaitlist = async (req, res) => {
  logger.info('\n📥 RÉCUPÉRATION DE LA WAITLIST');
  
  try {
    logger.debug('\n🔍 Recherche de toutes les entrées de la waitlist');
    const entries = await Waitlist.find();

    logger.info('\n✅ Waitlist récupérée avec succès', {
      totalEntries: entries.length,
      hasEntries: entries.length > 0
    });
    
    res.status(200).json(entries);
  } catch (err) {
    logger.error('\n❌ GET WAITLIST ERROR', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code
    });
    res.status(500).json({ message: err.message });
  }
};

const deleteFromWaitlist = async (req, res) => {
  const { id } = req.params;
  logger.info('\n🗑️ SUPPRESSION WAITLIST', { id });
  try {
    const deleted = await Waitlist.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn('⚠️ Entrée waitlist introuvable pour suppression', { id });
      return res.status(404).json({ message: "Entrée de la waitlist non trouvée" });
    }
    logger.info('✅ Entrée waitlist supprimée', { id });
    res.status(200).json({ message: 'Entrée supprimée avec succès' });
  } catch (err) {
    logger.error('❌ Erreur suppression waitlist', { message: err.message, stack: err.stack, id });
    res.status(500).json({ message: "Erreur lors de la suppression de l'entrée de la waitlist" });
  }
};

module.exports = {
  addToWaitlist,
  getWaitlist,
  deleteFromWaitlist
};