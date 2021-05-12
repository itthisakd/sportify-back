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






const info7 = {
  method: "post",
  path: "/match",
  pagesToBeUsedIn: ["HomePage"],
  // purpose: "to let users deselect sports allow bulk create",
  table: "post in MATCHES",
};
const body7 = {
  fromId: 1,
  toId: 2,
  superlike: 0,
  like_returned: 0,
};

const info7 = {
  method: "patch",
  path: "/match",
  pagesToBeUsedIn: ["HomePage"],
  purpose: "to return a like",
  table: "patch in MATCHES",
};
const body7 = {
  like_returned: 1,
};

const info7 = {
  method: "delete",
  path: "/match",
  pagesToBeUsedIn: ["MatchesPage"],
  purpose: "to unmatch",
  table: "delete in MATCHES",
};
const body7 = {
  id: 1,
};