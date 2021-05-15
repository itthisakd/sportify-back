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
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "ํYou are unauthorized" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const user = await Account.findOne({
      attributes: [["id", "userId"]],
      where: { email: payload.email },
    });

    if (!user) return res.status(400).json({ message: "User not found" });
    req.user = account;
    next();
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
};

exports.googleProtect = async (req, res, next) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      tokenId: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);

    const user = await Account.findOne({
      attributes: [["id", "userId"]],
      where: { id: payload.id },
    });

    if (user === {}) return res.status(400).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, dob, gender, addSports, email } = req.body;

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

    if (addSports.length > 0) {
      const addArr = add.map((id) => {
        return { accountId: userId, sportId: id };
      });
      await SportBelongsTo.bulkCreate(addArr);
    }

    const payload = { id: user.id };
    const tokenId = 1;
  } catch (err) {
    next(err);
  }
};
