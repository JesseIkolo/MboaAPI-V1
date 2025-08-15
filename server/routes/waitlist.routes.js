// --- routes/waitlist.routes.js ---
const express = require('express');
const { addToWaitlist, getWaitlist, deleteFromWaitlist } = require('../controllers/waitlist.controller.js');

const router = express.Router();

router.post('/', addToWaitlist);
router.get('/', getWaitlist);
router.delete('/:id', deleteFromWaitlist);

module.exports = router;