const express = require('express');
const { getLink, createLink, linkVerification, getLinks, getUser } = require('../controllers/linkController');

const router = express.Router();

router.route('/').get(getLinks).post(createLink);
router.route('/:link').get(linkVerification, getLink);
router.route('/users/:id').get(getUser)

module.exports = router;
