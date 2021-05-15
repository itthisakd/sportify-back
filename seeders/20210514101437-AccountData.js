"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (amount--) {
      function randomGender(length) {
        var result = [];
        var characters = "mf";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
          );
        }
        return result.join("");
      }

      let date = new Date();
      let N = 40;
      let firstName = faker.name.firstName();
      data.push({
        first_name: firstName,
        gender: randomGender(1),
        email: faker.internet.email(),
        dob: faker.date.past(N, new Date()),
        about_me: "I am very nice and easy going so let be friend :)",
        instagram: "@" + firstName,
        spotify: "",
        job: faker.name.jobTitle(),
        school: "",
        current_location: "Mint Tower",
        last_active: faker.date.recent(),
        search_location: "Bangkok",
        search_age: "any",
        search_gender: randomGender(1),
        search_distance: Math.floor(Math.random() * 80),
        show_in_stack: Math.floor(Math.random() * 2),
        show_active: Math.floor(Math.random() * 2),
        created_at: date,
        updated_at: date,
        plan_id: Math.floor(Math.random() * 3),
      });
    }

    // เอาแค่ sports, accounts, plans, sportbelongsto แค่นี้ก่อนพอครับ + media ด้วยก็ได้ ไปหารูป picsum มา

    return queryInterface.bulkInsert("accounts", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
