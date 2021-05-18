"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];
    const sport = [
      "Basketball",
      "Tennis",
      "Golf",
      "Badminton",
      "Swimming",
      "Boxing",
      "Table Tennis",
      "Roller Skating",
      "Skateboarding",
      "Football",
      "Bowling",
      "Wakeboarding",
      "Surfboarding",
      "Cycling",
      "Archery",
      "Fishing",
      "Rock Climbing",
      "Taekwondo",
      "Fitness",
      "Scuba-diving",
      "Rugby",
      "Ice Skating",
      "Wrestling",
      "Waterpolo",
      "Karate",
      "Kungfu",
      "Curling",
      "Surfing",
      "Shooting",
      "Hockey",
      "Floorball",
      "Baseball",
      "Skiing",
      "Snowboarding",
      "Weight lifting",
      "Horse Riding",
      "Squash",
      "Long Distance Running",
      "Sprinting",
      "Fencing",
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
