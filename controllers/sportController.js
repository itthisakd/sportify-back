const { Sport, SportBelongsTo, Account, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sport.findAll({
      order: [["sportName"]],
    });
    res.status(200).json({ sports });
  } catch (err) {
    next(err);
  }
};

exports.editUserSports = async (req, res, next) => {
  try {
    const { add, remove } = req.body;

    await SportBelongsTo.destroy({});

    // await SportBelongsTo.destroy({
    //   remove,
    //  accountId: req.Account.id
    // });

    res.status(200).json({ message: "User's sports updated successfully" });
  } catch (err) {
    next(err);
  }
};

const info4 = {
  method: "get",
  path: "/sports",
  pagesToBeUsedIn: ["RegisterPage", "EditInfoPage", "SettingsPage"],
  purpose: "to get sports to allow users to select",
  table: "get from SPORTS",
};
const output_sports = [
  { id: 1, sportName: "Basketball" },
  { id: 2, sportName: "Badminton" },
  { id: 3, sportName: "Tennis" },
  { id: 4, sportName: "Golf" },
  { id: 5, sportName: "Fencing" },
];

// COMBINE 5&6 into 1 controller to post and delete in one api
const info5 = {
  method: "post & delete",
  path: "/sports",
  pagesToBeUsedIn: ["RegisterPage", "EditInfoPage", "SettingsPage"],
  purpose: "to let users select sports, allow bulk create",
  table: "post & delete in SPORTBELONGSTO",
};
const body5 = {
  add: [1, 2, 4],
  remove: [5],
};


