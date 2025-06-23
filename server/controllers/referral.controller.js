const Referral = require('../models/referral.model');
const User = require('../models/user.model');
const crypto = require('crypto');
const RewardRule = require('../models/rewardRule.model');
const ReferralReward = require('../models/referralReward.model');

// Générer ou récupérer le code de parrainage d'un utilisateur
exports.getOrCreateReferralCode = async (req, res) => {
  try {
    const userId = req.user._id;
    let referral = await Referral.findOne({ referrerId: userId });
    if (!referral) {
      // Générer un code unique (userId ou hash)
      const code = userId.toString();
      referral = await Referral.create({ referrerId: userId, referralCode: code });
    }
    res.json({ referralCode: referral.referralCode, link: `https://mboaevents.com/signup?ref=${referral.referralCode}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enregistrer un clic sur un lien de parrainage
exports.registerReferralClick = async (req, res) => {
  try {
    const { ref } = req.query;
    if (!ref) return res.status(400).json({ message: 'Code de parrainage manquant' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const deviceInfo = req.headers['user-agent'] || '';
    const referral = await Referral.findOne({ referralCode: ref });
    if (!referral) return res.status(404).json({ message: 'Code de parrainage inconnu' });
    referral.clicks.push({ ipAddress: ip, deviceInfo, referralCode: ref });
    await referral.save();
    // Stocker le code en cookie (24h)
    res.cookie('referralCode', ref, { maxAge: 24*60*60*1000, httpOnly: true });
    res.json({ message: 'Clic enregistré' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Associer un utilisateur à un parrain lors de l'inscription
exports.associateReferralOnSignup = async (user, req) => {
  try {
    const ref = req.cookies?.referralCode || req.body.referralCode;
    if (!ref) return;
    // Prévention auto-parrainage
    if (user.email && user.email.includes(ref)) return;
    const referral = await Referral.findOne({ referralCode: ref });
    if (!referral) return;
    // Empêcher auto-parrainage par IP (optionnel)
    // if (referral.clicks.some(click => click.ipAddress === req.ip)) return;
    // Associer le nouvel utilisateur
    if (!referral.successfulSignups.includes(user._id)) {
      referral.successfulSignups.push(user._id);
      await referral.save();
    }
    // Option : stocker l'id du parrain dans le user
    user.referrer = referral.referrerId;
    await user.save();
    // Vérifier les règles de récompense actives
    const rules = await RewardRule.find({ isActive: true });
    for (const rule of rules) {
      // Compter les filleuls valides selon la règle
      let count = 0;
      if (rule.criteria.minType === 'any') {
        count = referral.successfulSignups.length;
      } else {
        const users = await User.find({ _id: { $in: referral.successfulSignups }, isPremium: rule.criteria.minType === 'premium' });
        count = users.length;
      }
      // Vérifier si le seuil est atteint et pas déjà récompensé
      const alreadyRewarded = await ReferralReward.findOne({ userId: referral.referrerId, ruleId: rule._id, rewardValue: rule.rewardValue });
      if (count >= rule.criteria.minSignups && !alreadyRewarded) {
        await ReferralReward.create({
          userId: referral.referrerId,
          ruleId: rule._id,
          rewardType: rule.type,
          rewardValue: rule.rewardValue,
          status: 'granted',
          grantedAt: new Date()
        });
        // Attribution réelle : créditer un mois premium
        if (rule.type === 'premium_month') {
          const referrerUser = await User.findById(referral.referrerId);
          if (referrerUser) {
            const now = new Date();
            if (!referrerUser.premiumUntil || referrerUser.premiumUntil < now) {
              referrerUser.premiumUntil = new Date(now.setMonth(now.getMonth() + rule.rewardValue));
            } else {
              referrerUser.premiumUntil = new Date(referrerUser.premiumUntil.setMonth(referrerUser.premiumUntil.getMonth() + rule.rewardValue));
            }
            referrerUser.subscription = 'premium';
            await referrerUser.save();
          }
        }
      }
    }
  } catch (error) {
    // Ne bloque pas l'inscription
    console.error('Referral association error:', error);
  }
};

// Stats du parrain connecté
exports.getReferralStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const referral = await Referral.findOne({ referrerId: userId }).populate('successfulSignups', 'email isPremium');
    if (!referral) return res.json({ clicks: 0, signups: 0, successfulSignups: [] });
    res.json({
      clicks: referral.clicks.length,
      signups: referral.successfulSignups.length,
      successfulSignups: referral.successfulSignups
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Classement des meilleurs parrains
exports.getReferralLeaderboard = async (req, res) => {
  try {
    const top = await Referral.find().sort({ 'successfulSignups.length': -1 }).limit(10).populate('referrerId', 'email');
    res.json(top.map(r => ({
      referrer: r.referrerId,
      signups: r.successfulSignups.length,
      clicks: r.clicks.length
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les récompenses du user connecté
exports.getUserRewards = async (req, res) => {
  try {
    const rewards = await ReferralReward.find({ userId: req.user._id }).populate('ruleId');
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les récompenses (admin)
exports.getAllRewards = async (req, res) => {
  try {
    const { userId, status } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    const rewards = await ReferralReward.find(filter).populate('userId', 'email').populate('ruleId');
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une règle de récompense (admin)
exports.createRewardRule = async (req, res) => {
  try {
    const rule = await RewardRule.create(req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une règle de récompense (admin)
exports.updateRewardRule = async (req, res) => {
  try {
    const rule = await RewardRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rule) return res.status(404).json({ message: 'Règle non trouvée' });
    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lister toutes les règles de récompense
exports.getRewardRules = async (req, res) => {
  try {
    const rules = await RewardRule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 