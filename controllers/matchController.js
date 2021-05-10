const { Account, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.matchAccount = async (req, res, next) => {
  try {
    const partner = await Account.findOne({
      order: sequelize.random(),
      attributes: [
        "firstName",
        "gender",
        "dateOfBirth",
        "aboutMe",
        "instagram",
        "job",
        "company",
        "school",
        "currentLocation",
        "lastActive",
      ],
    });
    res.status(200).json({ partner });
  } catch (err) {
    next(err);
  }
};

// NOTE mactchAccount idea is to random others account to show one by one and if those account is already match they wont showup again ..

// NOTE like_returned default = false //
