"use strict";

const { lorem } = require("faker");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (amount--) {
      let date = new Date();
      let N = 40;
      data.push({
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        dob: faker.date.past(N, new Date()),
        date_of_birth: faker.date.past(N, new Date()),
        about_me:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, commodi cupiditate laboriosam in minima repellat? Perspiciatis ipsum accusamus nostrum animi?",
        current_location: "Mint Tower",
        search_location: "Bangkok",
        instagram: "@" + faker.name.firstName(),
        created_at: date,
        updated_at: date,
      });
    }

    // เอาแค่ sports, accounts, plans, sportbelongsto แค่นี้ก่อนพอครับ + media ด้วยก็ได้ ไปหารูป picsum มา

    return queryInterface.bulkInsert("accounts", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
