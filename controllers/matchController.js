const { Account, Match, sequelize } = require("../models");
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

//ANCHOR get
exports.getMatches = async (req, res, next) => {
  try {
    // const userId = req.user.userId
    const matchData = await Match.findAll({ where: { fromId: 1 } });
    res.status(200).json(matchData);
  } catch (err) {
    next(err);
  }
};

//ANCHOR post
exports.createMatch = async (req, res, next) => {
  try {
    // const {userId} = req.user
    const { fromId, toId, superlike } = req.body;
    await Match.create({
      fromId,
      toId,
      superlike,
    });
    res.status(201).json({ message: "Match created successfully" });
  } catch (err) {
    next(err);
  }
};

//ANCHOR patch
exports.returnLike = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    await Match.update({ likeReturned: 1 }, { where: { id: matchId } });

    res.status(200).json({ message: "updated successfully!!!!!" });
  } catch (err) {
    next(err);
  }
};

//ANCHOR patch
exports.seen = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    await Match.update({ seen: 1 }, { where: { id: matchId } });

    res.status(200).json({ message: "updated successfully!!!!!" });
  } catch (err) {
    next(err);
  }
};

//ANCHOR delete
exports.unmatch = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    await Match.update({ where: { id: matchId } });

    res.status(204).json({ message: "deleted successfully!!!!!" });
  } catch (err) {
    next(err);
  }
};

// const info7 = {
//   method: "post",
//   path: "/match",
//   pagesToBeUsedIn: ["HomePage"],
//   // purpose: "to let users deselect sports allow bulk create",
//   table: "post in MATCHES",
// };
// const body7 = {
//   fromId: 1,
//   toId: 2,
//   superlike: 0,
//   like_returned: 0,
// };

// const info7 = {
//   method: "patch",
//   path: "/match",
//   pagesToBeUsedIn: ["HomePage"],
//   purpose: "to return a like",
//   table: "patch in MATCHES",
// };
// const body7 = {
//   like_returned: 1,
// };

// const info7 = {
//   method: "delete",
//   path: "/match",
//   pagesToBeUsedIn: ["MatchesPage"],
//   purpose: "to unmatch",
//   table: "delete in MATCHES",
// };
// const body7 = {
//   id: 1,
// };

// const info7 = {
//   method: "get",
//   path: "/match",
//   pagesToBeUsedIn: ["HomePage"],
//   purpose: "to return a like",
//   table: "patch in MATCHES",
// };
