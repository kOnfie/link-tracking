const express = require('express');
const { createLink, linkVerification, getLinks, getUser } = require('../controllers/linkController');

const router = express.Router();

router.route('/').get(getLinks).post(createLink);
router.route('/users/:id').get(getUser)

module.exports = router;
