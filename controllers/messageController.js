const { Sport, SportBelongsTo, Account, sequelize, Message } = require("../models");
const { Op } = require("sequelize");

//   await axios.get("/messages/" + roomId);
exports.getMessages = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const accId = req.params.id.split("-").filter((e) => +e !== +userId)[0];
    const getAllMessages = await Message.findAll({
      where: {[Op.or]: [
        {[Op.and]: [{ fromId: userId }, { toId: accId }]},
        {[Op.and]: [{ fromId: accId }, { toId: userId }]},
      ]
      },
      order:[['id', 'ASC'],['time','ASC']]
    });
    res.status(200).json({messages});
  } catch (err) {
    next(err);
  }
};
// await axios.post("/messages/", {
//   newMessages: [
//     { id: 1, toId: 1003, fromId: 567, message: "hello", room: "567-1003" },
//     { id: 2, toId: 567, fromId: 1003, message: "hi!", room: "567-1003" },
//     {
//       id: 3,
//       toId: 1003,
//       fromId: 567,
//       message: "Hello again",
//       room: "567-1003",
//     },
//   ],
// });
exports.storeMessages = async (req, res, next) => {
  try {
    await Message.bulkCreate(req.body.newMessages)
    res.status(200).json({ message: "Stored messages successfully"})
  } catch (err) {
    next(err);
  }
};
