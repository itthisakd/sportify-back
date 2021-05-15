"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (amount--) {
      data.push({
        plan_name: 1,
        plan_price: 100,
        plan_desc: "Unlimited swipe",
      });
    }

    return queryInterface.bulkInsert("plans", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
