const { calcDistance } = require("../utilities/calcDistance.js");
const { shuffle } = require("../utilities/shuffle.js");
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
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
      ],
      where: { id: userId },
    });

    const account = {
      id: raw.id,
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
          skill: sport.skill,
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

    res.status(200).json({ ...account });
  } catch (err) {
    next(err);
  }
};

exports.accountById = async (req, res, next) => {
  try {
    const accId = +req.params.id;
    const userId = +req.user.userId;

    const me = await Account.findOne({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
        {
          model: Match,
          as: "MatchTo",
          where: { [Op.and]: [{ toId: userId }, { fromId: accId }] },
        },
      ],
      where: { id: userId },
    });

    const raw = await Account.findOne({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
        {
          model: Match,
          as: "MatchFrom",
          where: { [Op.and]: [{ toId: userId }, { fromId: accId }] },
        },
      ],
      where: {
        id: accId,
      },
    });

    const account = {
      id: raw.id,
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
      recentlyActive:
        DateTime.now().diff(DateTime.fromISO(raw.lastActive), "hours").hours <=
        24
          ? 1
          : 0,
      sports: raw.SportBelongsTos?.map((sport) => {
        return {
          sportId: sport.sportId,
          sportName: sport.Sport.sportName,
          skill: sport.skill,
        };
      }),
      age: Math.floor(
        DateTime.now().diff(DateTime.fromISO(raw.dob), "years").years
      ),
      distance: calcDistance(raw.currentLocation, me.currentLocation),
      planId: raw.Plan.id,
      planName: raw.Plan.planName,
      images: raw.Media,
      commonSports: raw.SportBelongsTos?.map((sport) => {
        return sport.sportId;
      }).filter((spt) =>
        me.SportBelongsTos?.map((sport) => {
          return sport.sportId;
        }).includes(spt)
      ),
      likedMe:
        raw.MatchFrom?.length > 0
          ? {
              matchId: raw.MatchFrom[0].id,
              matchFrom: raw.MatchFrom[0].fromId,
              superlike: raw.MatchFrom[0].superlike,
              seen: raw.MatchFrom[0].seen,
            }
          : false,
    };

    res.status(200).json({ account });
  } catch (err) {
    next(err);
  }
};

exports.accountMatchedById = async (req, res, next) => {
  try {
    const userId = +req.user.userId;
    const myCurrentLocation = req.user.currentLocation;

    let accId = null;
    if (req.params.id.includes("-")) {
      accId = req.params.id.split("-").filter((e) => +e !== +userId)[0];
    } else {
      accId = +req.params.id;
    }

    const raw = await Account.findOne({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
      ],
      where: {
        id: accId,
      },
    });

    const account = {
      id: raw.id,
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
      recentlyActive:
        DateTime.now().diff(DateTime.fromISO(raw.lastActive), "hours").hours <=
        24
          ? 1
          : 0,
      sports: raw.SportBelongsTos?.map((sport) => {
        return {
          sportId: sport.sportId,
          sportName: sport.Sport.sportName,
          skill: sport.skill,
        };
      }),
      age: Math.floor(
        DateTime.now().diff(DateTime.fromISO(raw.dob), "years").years
      ),
      distance: calcDistance(raw.currentLocation, myCurrentLocation),
      planId: raw.Plan.id,
      planName: raw.Plan.planName,
      images: raw.Media,
    };

    res.status(200).json({ ...account, userId });
  } catch (err) {
    next(err);
  }
};

exports.generateStack = async (req, res, next) => {
  try {
    const { userId, offset, currentLocation } = req.user;

    const rawMe = await Account.findOne({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
      ],
      where: { id: userId },
    });
    const me = await {
      id: rawMe.id,
      firstName: rawMe.firstName,
      gender: rawMe.gender,
      email: rawMe.email,
      dob: rawMe.dob,
      aboutMe: rawMe.aboutMe,
      spotify: rawMe.spotify,
      instagram: rawMe.instagram,
      job: rawMe.job,
      school: rawMe.school,
      currentLocation: rawMe.currentLocation,
      lastActive: rawMe.lastActive,
      searchLocation: rawMe.searchLocation,
      searchAge: rawMe.searchAge,
      searchGender: rawMe.searchGender,
      searchDistance: rawMe.searchDistance,
      showInStack: rawMe.showInStack,
      showActive: rawMe.showActive,
      deactivated: rawMe.deactivated,
      offset: rawMe.offset,
      sports: rawMe.SportBelongsTos?.map((sport) => {
        return {
          sportId: sport.sportId,
          sportName: sport.Sport.sportName,
          sport: sport.skill,
        };
      }),
      planId: rawMe.Plans?.id,
      planName: rawMe.Plans?.planName,
      images: rawMe.Media,
      age: Math.floor(
        DateTime.now().diff(DateTime.fromISO(rawMe.dob), "years").years
      ),
      recentlyActive:
        DateTime.now().diff(DateTime.fromISO(rawMe.lastActive), "hours")
          .hours <= 24
          ? 1
          : 0,
    };

    const raw = await Account.findAll({
      include: [
        {
          model: SportBelongsTo,
          include: {
            model: Sport,
            attributes: ["sportName"],
          },
          attributes: ["sportId", "accountId", "skill"],
        },
        { model: Plans, attributes: ["id", "planName"] },
        { model: Media, attributes: ["id", ["media", "image"]] },
        {
          model: Match,
          as: "MatchTo",
          // where: { toId: userId },
        },
      ],
      where: {
        id: { [Op.not]: userId },
      },
      offset: +offset,
      limit: 50,
    });

    const stack = await raw.map((acc) => {
      return {
        id: acc.id,
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
        recentlyActive:
          DateTime.now().diff(DateTime.fromISO(acc.lastActive), "hours")
            .hours <= 24
            ? 1
            : 0,
        sports: acc.SportBelongsTos?.map((sport) => {
          return {
            sportId: sport.sportId,
            sportName: sport.Sport.sportName,
            skill: sport.skill,
          };
        }),
        age: Math.floor(
          DateTime.now().diff(DateTime.fromISO(acc.dob), "years").years
        ),
        distance: calcDistance(acc.currentLocation, currentLocation),
        planId: acc.Plan.id,
        planName: acc.Plan.planName,
        images: acc.Media,
        commonSports: acc.SportBelongsTos?.map((sport) => {
          return sport.sportId;
        }).filter((spt) =>
          rawMe.SportBelongsTos?.map((sport) => {
            return sport.sportId;
          }).includes(spt)
        ),
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

    const filteredStack = await stack?.filter((acc) => {
      return (
        acc?.showInStack === true &&
        acc.commonSports?.length > 0 &&
        acc.searchGender.includes(me.gender) &&
        me.searchGender.includes(acc.gender) &&
        me.age >= acc.searchAge?.split("-")[0] &&
        me.age <= acc.searchAge?.split("-")[1] &&
        acc.age >= me.searchAge?.split("-")[0] &&
        acc.age <= me.searchAge?.split("-")[1] &&
        calcDistance(acc.currentLocation, me.currentLocation) <=
          me.searchDistance &&
        calcDistance(me.currentLocation, me.currentLocation) <=
          acc.searchDistance
      );
    });

    // const shuffledStack = await [
    //   ...filteredStack?.filter((acc) => acc.likedMe),
    //   ...shuffle(filteredStack?.filter((acc) => acc.likedMe === false)),
    // ];

    res.status(200).json({ stack: filteredStack });
  } catch (err) {
    next(err);
  }
};

exports.updateOffset = async (req, res, next) => {
  try {
    const { accId } = req.body;
    const userId = req.user.userId;

    await Account.update(
      {
        offset: +accId,
      },
      { where: { id: userId } }
    );

    return res.status(200).json({ message: "Updated offset successfully" });
  } catch (err) {
    next(err);
  }
};

exports.currentLocation = async (req, res, next) => {
  try {
    const { currentLocation, addSearchLo } = req.body;
    const userId = req.user.userId;

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

exports.editMyAccount = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.userId;


    await Account.update(body, { where: { id: userId } });

    return res.status(200).json({ message: "Updated account successfully!" });
  } catch (err) {
    next(err);
  }
};
