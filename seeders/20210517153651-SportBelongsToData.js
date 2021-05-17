"use strict";

const { Account, Sport } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const idObjArr = await Account.findAll({ attributes: ["id"] });
    const accountIds = idObjArr.map((idObj) => idObj.id);
    console.log("accountIds :>> ", accountIds);
    const sportObjArr = await Sport.findAll({ attributes: ["id"] });
    const sportIds = sportObjArr.map((idObj) => idObj.id);
    console.log(`sportIds`, sportIds);

    const data = accountIds
      .map((id) => {
        let arr = [];

        for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
          arr.push({
            account_id: id,
            sport_id: sportIds[Math.floor(Math.random() * sportIds.length)],
          });
        }
        return arr;
      })
      .flat();

    console.log("data", data);
    return queryInterface.bulkInsert("sport_belongs_tos", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sport_belongs_tos", null, {});
  },
};
