const Link = require('../models/linkModel');

exports.getLink = async (req, res) => {
  try {
    const queryParams = new URLSearchParams(req.query).toString();
    const fullLink = `https://${req.params.link}` + '/?' + queryParams;

    const existingLinkObj = await Link.findOne({ partnerLink: `${fullLink}` });

    const today = new Date();
    const timeOfCreation = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    if (existingLinkObj) {
      await Link.findByIdAndUpdate(
        existingLinkObj._id,
        { $push: { users: timeOfCreation } },
        { new: true }
      );
    }

    res.redirect(301, `https://${req.params.link}`);
  } catch (error) {
    res.status(402).json({ status: 'fail', message: error });
  }
};
