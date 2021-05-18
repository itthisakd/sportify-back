const { Account, Match, sequelize, Media } = require("../models");
const { Op } = require("sequelize");
const { DateTime } = require("luxon");

//ANCHOR get
exports.getMatches = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const raw = await Match.findAll({
      include: [
        {
          model: Account,
          as: "MatchTo",
          include: {
            model: Media,
            order: [
              [Media, "createdAt", "ASC"],
              [Media, "id", "ASC"],
            ],
          },
        },
        {
          model: Account,
          as: "MatchFrom",
          include: {
            model: Media,
            order: [
              [Media, "createdAt", "ASC"],
              [Media, "id", "ASC"],
            ],
          },
        },
      ],
      where: {
        [Op.and]: [
          { [Op.or]: [{ fromId: userId }, { toId: userId }] },
          { likeReturned: true },
        ],
      },
    });

    const matches = await raw.map((match) => {
      return {
        matchId: match.id,
        fromId: match.fromId,
        toId: match.toId,
        matchedAt: match.updatedAt,
        matchAcc:
          match.MatchTo.id === userId
            ? {
                id: match.MatchFrom.id,
                firstName: match.MatchFrom.firstName,
                profilePhoto: match.MatchFrom.Media[0]?.media,
              }
            : {
                id: match.MatchTo.id,
                firstName: match.MatchTo.firstName,
                profilePhoto: match.MatchTo.Media[0]?.media,
              },
      };
    });

    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
};

//TODO
//ANCHOR post
exports.createMatch = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { toId, superlike } = req.body;
    await Match.create({
      fromId: userId,
      toId,
      superlike,
      seen: 0,
    });
    await Account.update(
      {
        offset: toId,
      },
      { where: { id: userId } }
    );
    res.status(201).json({ message: "Match created successfully" });
  } catch (err) {
    next(err);
  }
};

//ANCHOR patch
exports.returnLike = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    const userId = req.user.userId;
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
    await Match.destroy({ where: { id: matchId } });

    res.status(204).json({ message: "deleted successfully!!!!!" });
  } catch (err) {
    next(err);
  }
};

//ANCHOR get
exports.getLikedBy = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const raw = await Match.findAll({
      include: [
        {
          model: Account,
          as: "MatchFrom",
          include: {
            model: Media,
            order: [
              [Media, "createdAt", "ASC"],
              [Media, "id", "ASC"],
            ],
          },
        },
      ],
      where: {
        //FIXME remove op.or
        [Op.and]: [{ toId: userId }, { likeReturned: false }],
      },
    });

    const matches = await raw.map((match) => {
      return {
        matchId: match.id,
        fromId: match.fromId,
        toId: match.toId,
        matchedAt: match.updatedAt,
        matchAcc: {
          id: match.MatchFrom.id,
          firstName: match.MatchFrom.firstName,
          age: Math.floor(
            DateTime.now().diff(DateTime.fromISO(match.MatchFrom.dob), "years")
              .years
          ),
          profilePhoto: match.MatchFrom.Media[0].media,
        },
      };
    });

    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
};

//ANCHOR get
exports.getLikedByAccounts = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // const matches = await Match.findAll({

    // })

    const raw = await Match.findAll({
      include: [
        {
          model: Account,
          as: "MatchFrom",
          include: {
            model: Media,
            order: [
              [Media, "createdAt", "ASC"],
              [Media, "id", "ASC"],
            ],
          },
        },
      ],
      where: {
        [Op.and]: [{ toId: userId }, { likeReturned: false }],
      },
    });

    const matches = await raw.map((match) => {
      return {
        matchId: match.id,
        fromId: match.fromId,
        toId: match.toId,
        matchedAt: match.updatedAt,
        matchAcc: {
          id: match.MatchFrom.id,
          firstName: match.MatchFrom.firstName,
          profilePhoto: match.MatchFrom.Media[0].media,
        },
      };
    });

    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
};
