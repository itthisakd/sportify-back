const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  Account,
  Plans,
  Sport,
  SportBelongsTo,
  Media,
  Match,
} = require("../models");
const { DateTime } = require("luxon");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({ message: "ํYou are unauthorized" });

    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const user = await Account.findOne({
      attributes: [["id", "userId"], "email"],
      where: { email: payload.email },
    });

    if (!user.dataValues) return res.status(400).json({ message: "User not found" });
    req.user = user.dataValues;
    next();
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await Account.findOne({
      attributes: [["id", "userId"]],
      where: { email: payload.email },
    });

    if (!user) {
      return res.status(200).json({
        registered: false,
        message: "You do not have an account. Please register.",
      });
    } else if (user.dataValues.userId) {
      req.user = { userId: user.dataValues.userId, token: tokenId };
      return res.status(200).json({
        registered: true,
        message: "Login successfully",
        userId: user.dataValues.userId,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({ message: "ํYou are unauthorized" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    const {
      firstName,
      dob,
      gender,
      addSports,
      searchLocation,
      currentLocation,
    } = req.body;


    const user = await Account.create({
      firstName,
      gender,
      dob,
      email,
      searchLocation,
      currentLocation,
      planId: 1,
      lastActive: DateTime.now().toString(),
    });

    const addArr = addSports?.map((id) => {
      return { accountId: user.id, sportId: id };
    });

    if (addArr.length === 1) {
    await SportBelongsTo.create(addArr[0]);
      
    } else {
    await SportBelongsTo.bulkCreate(addArr);

    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
