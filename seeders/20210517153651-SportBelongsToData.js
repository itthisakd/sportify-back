"use strict";

const { Account, Sport } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arr = [];
    const idObjArr = Account.findAll({ attributes: ["id"] });
    const accountIds = arr.map((idObj) => idObj.id);
    const sportObjArr = Sport.findAll({ attributes: ["id"] });
    const sportsIds = arr.map((idObj) => idObj.id);

    const data = accountIds
      .map((id) => {
        for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
          arr.push({
            account_id: id,
            sport_id: Math.ceil(Math.random() * sportIds.length),
          });
        }
        return arr;
      })
      .flat();
    return queryInterface.bulkInsert("sport_belongs_tos", arr, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sport_belongs_tos", null, {});
  },
};
