"use strict";

const faker = require("faker");

// Sequelize db:seed --seed 20210515221645-PlansData.js
// Sequelize db:seed --seed 20210514101437-AccountData
// Sequelize db:seed --seed 20210517090948-SportData
// Sequelize db:seed --seed 20210517153651-SportBelongsToData
// Sequelize db:seed --seed 20210517174052-MediaData

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 10000;
    const aboutMe = [
      "I am very nice and easy going person. Let's do it together",
      "Looking for a defender/forwarder in my football team :)",
      "A muscle builder since 2016, whoever wanted an advice swipe right. ποΈββοΈποΈββοΈ",
      "Yoga club's member in BKK. π§π»ββοΈπ§π»ββοΈ",
      "Badminton lover.",
      "Jogging is amazing!",
      "No pain, no gain. π",
      "Train insane or remain the same.",
      "Let's train together!",
      "Be yourself. ππ",
      "Follow your inner moonlight π",
      "You cannot change what you are, only what you do π",
      "I donβt care what you think about me. I donβt think about you at all π",
      "They canβt scare me, if I scare them first. π",
      "Follow your own star!πβ­οΈπ«β¨",
      "Fool me once, shame on you. Fool me twice, shame on me.",
      "Life is like a mirrorπ",
      "Keep smiling π",
      "Today will be a good day",
      "Iβm learning to love myself.β€οΈ",
      "Swing at the strikes. ",
      "Hard work beats talent when talent doesnβt work hard.π",
      "Itβs hard to beat a person who never gives up.",
      "Never say never because limitsππΎ",
      "Never give up !",
      "Set your goals high, and don't stop till you get there.",
      "A trophy carries dust. Memories last forever π",
      "Success is where preparation and opportunity meet",
      "Age is no barrier. Itβs a limitation you put on your mind.",
      "Hey! Let's climb together π§ββοΈ",
      "Hi, there! I'm a coach and would love to help anyone who is interested! β½οΈππ",
      "I'm climbing 6B+ and love the outdoors. I can be your belayer! ππ",
      "I'm training for the upcoming Bangkok Marathon. If you want to train, ping me! πββοΈπββοΈπ",
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
      let gender = ["m", "f"][Math.floor(Math.random() * 2)];

      const lat = (Math.random() * (14.426406 - 13.402033) + 13.402033).toFixed(
        10
      );
      const long = (
        Math.random() * (101.237626 - 99.692825) +
        99.692825
      ).toFixed(10);
      const location = [lat, long].join(",");
      const mFirstName = faker.name.firstName(0);
      const fFirstName = faker.name.firstName(1);

      data.push({
        first_name: gender === "m" ? mFirstName : fFirstName,
        gender: gender,
        email: faker.internet.email().toLowerCase(),
        dob: faker.date.between("1981-01-01", "2002-01-01"),
        about_me: aboutMe[Math.floor(Math.random() * aboutMe.length)],
        instagram:
          gender === "m" ? mFirstName.toLowerCase() : fFirstName.toLowerCase(),
        spotify:
          gender === "m" ? mFirstName.toLowerCase() : fFirstName.toLowerCase(),
        job: faker.name.jobTitle(),
        school: school[Math.floor(Math.random() * school.length)],
        current_location: location,
        last_active: lastActive,
        search_location: location,
        search_age: "18-35",
        search_gender: ["m", "f", "mf"][Math.floor(Math.random() * 3)],
        search_distance: Math.floor(Math.random() * 40) + 100,
        show_in_stack: 1,
        show_active: [0, 1][Math.floor(Math.random() * 2)],
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
