"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];
    const sport = [
      "Basketball",
      "Tennis",
      "Golf",
      "Running",
      "Badminton",
      "Swimming",
      "Boxing",
      "Table-tennis",
      "Roller-skating",
      "Skateboarding",
      "Football",
      "Bowling",
      "Wakeboarding",
      "Surfboarding",
      "Surfing",
      "Karate",
      "Cycling",
      "Archery",
      "Fishing",
      "Rock-climbing",
      "Taekwondo",
      "Fitness",
      "Scuba-diving",
    ];

    sport.forEach(function (unique) {
      data.push({
        sport_name: unique,
      });
    });

    return queryInterface.bulkInsert("sports", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sports", null, {});
  },
};
