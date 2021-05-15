// const { calcDistance } = require("../utilities/calcDistance");
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
    const { userId } = req.user;

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
    const userId = req.params.id;

    const acc = await Account.findOne({
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

    const account = {
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
        DateTime.now().diff(DateTime.fromISO(acc.lastActive), "hours").hours <=
        24
          ? 1
          : 0,
    };

    res.status(200).json({ account });
  } catch (err) {
    next(err);
  }
};

exports.generateStack = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

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
      where: { [Op.not]: { id: userId } },
    });

    const stack = await raw?.map((acc) => {
      if (acc.likedMe.seen === false || acc.likedMe === false)
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
    });

    //TODO SORT STACK BY FIELDS IN DISCOVERY

    res.status(200).json({ stack });
  } catch (err) {
    next(err);
  }
};

exports.currentLocation = async (req, res, next) => {
  try {
    const { currentLocation, addSearchLo } = req.body;
    console.log(req.body);
    const userId = req.user.userId;
    console.log(userId);

    if (addSearchLo) {
      await Account.update(
        {
          currentLocation: currentLocation,
          searchLocation: currentLocation,
        },
        { where: { id: userId } }
      );
    } else {
      await Account.update({ currentLocation }, { where: { id: userId } });
    }

    return res
      .status(200)
      .json({ message: "Updated current location successfully" });
  } catch (err) {
    next(err);
  }
};
