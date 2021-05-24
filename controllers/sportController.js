const { Sport, SportBelongsTo, Account, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sport.findAll({
      attributes: [["id", "sportId"], "sportName"],
      order: [["sportName", "ASC"]],
    });
    res.status(200).json({ sports });
  } catch (err) {
    next(err);
  }
};

exports.getUserSports = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const sports = await SportBelongsTo.findAll({
      attributes: ["sportId", "skill"],
      where: { accountId: userId },
    });
    res.status(200).json({ sports });
  } catch (err) {
    next(err);
  }
};

exports.editUserSports = async (req, res, next) => {
  try {
    const { addSports: add, removeSports: remove } = req.body;
    const { userId } = req.user;

    if (add.length > 0) {
      const addArr = add.map((sport) => {
        return {
          accountId: userId,
          sportId: sport.sportId,
          skill: sport.skill,
        };
      });
      await SportBelongsTo.bulkCreate(addArr);
    }

    if (remove.length > 0) {
      await SportBelongsTo.destroy({
        where: {
          accountId: userId,
          sportId: {
            [Op.in]: remove,
          },
        },
      });
    }

    res.status(200).json({ message: "User's sports updated successfully" });
  } catch (err) {
    next(err);
  }
};
