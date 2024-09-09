const express = require('express');
const { getLink } = require('../controllers/handlePartnerLinkController');
const router = express.Router();

router.route('/:link').get(getLink);

module.exports = router;
