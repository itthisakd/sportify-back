const { Sport, SportBelongsTo, Account, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sport.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json({ sports });
  } catch (err) {
    next(err);
  }
};

exports.editUserSports = async (req, res, next) => {
  try {
    const { addSports: add, removeSports: remove } = req.body;
    // const { userId } = req.user;
    const userId = 1;

    if (add.length > 0) {
      const addArr = add.map((id) => {
        return { accountId: userId, sportId: id };
      });
      await SportBelongsTo.bulkCreate(addArr);
    }

    if (remove.length > 0) {
      const removeArr = remove.map((id) => {
        return { accountId: userId, sportId: id };
      });
      await SportBelongsTo.destroy({
        where: {
          accountId: userId,
          sportId: {
            [Op.in]: removeArr,
          },
        },
      });
    }

    res.status(200).json({ message: "User's sports updated successfully" });
  } catch (err) {
    next(err);
  }
};
