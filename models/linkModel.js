const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  partnerLink: {
    type: String,
    required: [true, 'Please provide linkId'],
  },
  timeOfCreation: {
    type: String,
    required: [true, 'Please provide time'],
  },
  users: { type: [String] },
});

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
