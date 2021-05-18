"use strict";

const faker = require("faker");

//Sequelize db:seed --seed 20210515221645-PlansData.js
// Sequelize db:seed --seed 20210514101437-AccountData
// Sequelize db:seed --seed 20210517090948-SportData
// Sequelize db:seed --seed 20210517153651-SportBelongsToData
// Sequelize db:seed --seed 20210517174052-MediaData

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 100;
    const aboutMe = [
      "I am very nice and easy going person. Let's do it together",
      "Looking for a defender/forwarder in my football team :)",
      "A muscle builder since 2016, whoever wanted an advice swipe right.",
      "Yoga club's member in BKK.",
      "Badminton lover.",
      "Jogging is very beneficial.",
      "No pain, no gain.",
      "Train insane or remain the same.",
      "If you liked training, let's meet!",
    ];

    const school = [
      "Spring Hill Academy",
      "Bear River Institute",
      "Laguna Creek High",
      "Great Oak High School",
      "Green Meadows Charter",
      "Palm Valley",
      "South Fork",
      "Whale Gulch University",
      "Forest Lake Technical School",
      "Pleasant Hill Institute",
      "Broad River Kindergarten",
      "Faith Technical School",
      "Northview Grammar School",
      "Big Valley University",
      "Cypress Charter School",
      "Hawking High School",
      "Patriot High School",
    ];

    while (amount--) {
      let date = new Date();
      let lastActive = faker.date.recent();
      let N = 40;
      let firstName = faker.name.firstName();

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

      function randomSearchGender(length) {
        let randomChars = "mf";
        let result = "";
        for (let i = 0; i < length; i++) {
          if (length === 2) return "mf";
          result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
          );
        }
        return result;
      }

      let searchGender = randomSearchGender(Math.floor(Math.random() * 2) + 1);

      data.push({
        first_name: firstName,
        gender: randomGender(1),
        email: faker.internet.email().toLowerCase(),
        dob: faker.date.between("1981-01-01", "2002-01-01"),
        about_me: aboutMe[Math.floor(Math.random() * aboutMe.length)],
        instagram: firstName.toLowerCase(),
        spotify: firstName.toLowerCase(),
        job: faker.name.jobTitle(),
        school: school[Math.floor(Math.random() * aboutMe.length)],
        current_location: "13.7453344001603,100.52897209337148",
        last_active: lastActive,
        search_location: "13.7453344001603,100.52897209337148",
        search_age: "18-35",
        search_gender: searchGender,
        search_distance: Math.floor(Math.random() * 40) + 40,
        show_in_stack: 1,
        show_active: 1,
        created_at: date,
        updated_at: date,
        plan_id: 1,
      });
    }

    return queryInterface.bulkInsert("accounts", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
