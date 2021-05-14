// const { calcDistance } = require("../utilities/calcDistance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  Account,
  Plans,
  Sport,
  SportBelongsTo,
  Media,
  Match,
} = require("../models");
const { Op } = require("sequelize");
const { DateTime } = require("luxon");

exports.myAccount = async (req, res, next) => {
  try {
    // const { userId } = req.user;
    const userId = 1;

    const raw = await Account.findOne({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
      ],
      where: { id: userId },
    });

    const stack = {
      firstName: raw.firstName,
      gender: raw.gender,
      email: raw.email,
      dob: raw.dob,
      aboutMe: raw.aboutMe,
      spotify: raw.spotify,
      instagram: raw.instagram,
      job: raw.job,
      school: raw.school,
      currentLocation: raw.currentLocation,
      lastActive: raw.lastActive,
      searchLocation: raw.searchLocation,
      searchAge: raw.searchAge,
      searchGender: raw.searchGender,
      searchDistance: raw.searchDistance,
      showInStack: raw.showInStack,
      showActive: raw.showActive,
      deactivated: raw.deactivated,
      sports: raw.SportBelongsTos.map((sport) => {
        return {
          sportId: sport.sportId,
          sportName: sport.Sport.sportName,
        };
      }),
      planId: raw.Plan.id,
      planName: raw.Plan.planName,
      images: raw.Media,
      age: Math.floor(
        DateTime.now().diff(DateTime.fromISO(raw.dob), "years").years
      ),
      recentlyActive:
        DateTime.now().diff(DateTime.fromISO(raw.lastActive), "hours").hours <=
        24
          ? 1
          : 0,
    };

    res.status(200).json({ ...stack });
  } catch (err) {
    next(err);
  }
};

exports.accountById = async (req, res, next) => {
  try {
    // const userId = req.params.id;
    const userId = 1;

    const raw = await Account.findAll({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
      ],
    });

    const stack = await raw?.map((acc) => {
      return {
        firstName: acc.firstName,
        gender: acc.gender,
        email: acc.email,
        dob: acc.dob,
        aboutMe: acc.aboutMe,
        spotify: acc.spotify,
        instagram: acc.instagram,
        job: acc.job,
        school: acc.school,
        currentLocation: acc.currentLocation,
        lastActive: acc.lastActive,
        searchLocation: acc.searchLocation,
        searchAge: acc.searchAge,
        searchGender: acc.searchGender,
        searchDistance: acc.searchDistance,
        showInStack: acc.showInStack,
        showActive: acc.showActive,
        deactivated: acc.deactivated,
        sports: acc.SportBelongsTos.map((sport) => {
          return {
            sportId: sport.sportId,
            sportName: sport.Sport.sportName,
          };
        }),
        planId: acc.Plan.id,
        planName: acc.Plan.planName,
        images: acc.Media,
        age: Math.floor(
          DateTime.now().diff(DateTime.fromISO(acc.dob), "years").years
        ),
        recentlyActive:
          DateTime.now().diff(DateTime.fromISO(acc.lastActive), "hours")
            .hours <= 24
            ? 1
            : 0,
      };
    });

    res.status(200).json({ stack });
  } catch (err) {
    next(err);
  }
};

exports.generateStack = async (req, res, next) => {
  try {
    // const { id: userId } = req.params;
    const userId = 1;

    const raw = await Account.findAll({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
        {
          model: Match,
          as: "MatchTo",
        },
      ],
    });

    const stack = await raw
      ?.map((acc) => {
        if(acc.likedMe.seen === false || acc.likedMe === false) return {
          firstName: acc.firstName,
          gender: acc.gender,
          email: acc.email,
          dob: acc.dob,
          aboutMe: acc.aboutMe,
          spotify: acc.spotify,
          instagram: acc.instagram,
          job: acc.job,
          school: acc.school,
          currentLocation: acc.currentLocation,
          lastActive: acc.lastActive,
          searchLocation: acc.searchLocation,
          searchAge: acc.searchAge,
          searchGender: acc.searchGender,
          searchDistance: acc.searchDistance,
          showInStack: acc.showInStack,
          showActive: acc.showActive,
          deactivated: acc.deactivated,
          sports: acc.SportBelongsTos.map((sport) => {
            return {
              sportId: sport.sportId,
              sportName: sport.Sport.sportName,
            };
          }),
          planId: acc.Plan.id,
          planName: acc.Plan.planName,
          images: acc.Media,
          likedMe:
            acc.MatchTo.length > 0
              ? {
                  matchId: acc.MatchTo[0].id,
                  matchFrom: acc.MatchTo[0].fromId,
                  superlike: acc.MatchTo[0].superlike,
                  seen: acc.MatchTo[0].seen,
                }
              : false,
        };
      })

//TODO SORT STACK BY FIELDS IN DISCOVERY 
    
    
    res.status(200).json({ stack });
  } catch (err) {
    next(err);
  }
};












//––––––––––––––––––––––––––

// exports.register = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       firstName,
//       password,
//       confirmPassword,
//       gender,
//       email,
//       dateOfBirth,
//       aboutMe,
//       instagram,
//       job,
//       company,
//       school,
//       searchLocation,
//       currentLocation,
//       lastActive,
//     } = req.body;
//     if (password !== confirmPassword)
//       return res
//         .status(400)
//         .json({ message: "password and confirm password doesnt match" });
//     if (gender !== "m" || "f")
//       return res.status(400).json({ message: "please selecet your gender" });
//     if (email === " ")
//       return res.status(400).json({ message: "please fill your email" });
//     if (dateOfBirth === " ")
//       return res
//         .status(400)
//         .json({ message: "please fill your date of birth" });
//     if (aboutMe === " ")
//       return res
//         .status(400)
//         .json({ message: "please explain a bit about yourself " });
//     if (searchLocation === " ")
//       return res.stauts(400).json({ message: "please enter search location" });
//     if (currentLocation === " ")
//       return res
//         .status(400)
//         .json({ message: "please enter your current location " });

//     const hashedPassword = await bcrypt.hash(
//       password,
//       +process.env.BCRYPT_SALT
//     );
//     const account = await Account.create({
//       firstName,
//       password: hashedPassword,
//     });

//     const payload = { id: account.id, firstName };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: +process.env.JWT_EXPIRES_IN,
//     });
//     res.status(201).json({ token });
//   } catch (err) {
//     next(err);
//   }
// };

// FIXME login by google account

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const account = await Account.findOne({
//       where: { firstName } || { email },
//     });
//     if (!email)
//       return res
//         .status(400)
//         .json({ meessage: "Login name or password is incorrect" });

//     const isMatch = await bcrypt.compare(password, account.password);
//     if (!isMatch)
//       return res
//         .status(400)
//         .json({ message: "Login name or password is incorrect " });
//     const payload = { id: account.id, firstName: account.firstName };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: +process.env.JWT_EXPIRES_IN,
//     });
//     res.status(200).json({ token });
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateAccount = async (req, res, next) => {
  try {
    const {
      planId,
      firstName,
      password,
      gender,
      email,
      aboutMe,
      instagram,
      job,
      company,
      school,
      searchLocation,
      currentLocation,
    } = req.body;
    await Account.update(
      {
        planId,
        firstName,
        password,
        gender,
        email,
        aboutMe,
        instagram,
        job,
        company,
        school,
        searchLocation,
        currentLocation,
      },
      { where: { id: req.account.id } }
    );
    res.status(200).json({ message: "Update account successfully" });
  } catch (err) {
    next(err);
  }
};
