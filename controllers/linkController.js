const Link = require('../models/linkModel');

exports.linkVerification = async (req, res, next) => {
  const queryParams = new URLSearchParams(req.query).toString();
  const fullLink = `https://${req.params.link}` + '/?' + queryParams;

  const existingLinkObj = await Link.findOne({ partnerLink: `${fullLink}` });

  const today = new Date();
  const timeOfCreation = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  if (existingLinkObj) {
    await Link.findByIdAndUpdate(
      existingLinkObj._id,
      {
        $push: { users: timeOfCreation },
      },
      {
        new: true,
      }
    );
  }

  next();
};

exports.getLink = (req, res) => {
  res.redirect(`https://${req.params.link}`);
};

exports.getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json({ status: 'success', links });
  } catch (error) {
    res.status(402).json({ status: 'fail', message: error });
  }
};

exports.createLink = async (req, res) => {
  try {
    const { link, offer, ground, name } = req.body;

    let formattedLink = link;
    if (link[link.length - 1] === '/') {
      formattedLink = link.slice(0, -1);
    }

    const fullLink = `${formattedLink}/?offer=${offer}&platform=${ground}&name=${name}`;
    const today = new Date();
    const timeOfCreation = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    const newLink = await Link.create({
      partnerLink: fullLink,
      timeOfCreation: timeOfCreation,
      users: [],
    });

    console.log(newLink);

    res.status(200).json({ status: 'success', data: { newLink } });
  } catch (error) {
    res.status(402).json({ status: 'fail', message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Link.findById(req.params.id);
    res.status(200).json({ status: 'success', user });
  } catch (error) {
    res.status(402).json({ status: 'fail', message: error });
  }
};
