"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 1;

    while (amount--) {
      data.push({
        plan_name: "lite",
        plan_price: 0,
        plan_desc: "up to 30 swipes per day",
      });
      data.push({
        plan_name: "pro",
        plan_price: 300,
        plan_desc: "unlimited swipe",
      });
    }

    return queryInterface.bulkInsert("plans", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
