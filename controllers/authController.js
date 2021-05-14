const { OAuth2Client } = require("google-auth-library");
const {
  Account,
  Plans,
  Sport,
  SportBelongsTo,
  Media,
  Match,
} = require("../models");


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
      return res.status(401).json({ message: "ํYOU ARE UNAUTHORIZED" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const account = await Account.findOne({
      attributes: [["id", "userId"]],
      where: { id: payload.id },
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

    const account = await Account.findOne({
      attributes: [["id", "userId"]],
      where: { id: payload.id },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    req.user = account
    next();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const{ firstName, dob, gender, images, addSports, email} = req.body
  
    await Account.create({firstName, gender, dob, email, searchLocation, currentLocation,  })

  } catch (err) {
    next(err);
  }
};