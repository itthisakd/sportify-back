const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Account } = require("../models");

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "you are unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const account = await Account.findOne({ where: { id: payload.id } });
    if (!user) return res.status(400).json({ message: "user not found" });
    req.account = account;
    next();
  } catch (err) {
    next(err);
  }
};

// FIXME login by google account
exports.myAccount = (req, res, next) => {
  try {
    const {
      planId,
      firstName,
      gender,
      email,
      dateOfBirth,
      aboutMe,
      instagram,
      job,
      company,
      school,
      searchLocation,
      currentLocation,
      lastActive,
    } = req.myAccount;
    res.status(200).json({
      myAccount: {
        planId,
        firstName,
        gender,
        email,
        dateOfBirth,
        aboutMe,
        instagram,
        job,
        company,
        school,
        searchLocation,
        currentLocation,
        lastActive,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      planId,
      firstName,
      password,
      confirmPassword,
      gender,
      email,
      dateOfBirth,
      aboutMe,
      instagram,
      job,
      company,
      school,
      searchLocation,
      currentLocation,
      lastActive,
    } = req.body;
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "password and confirm password doesnt match" });
    if (gender !== MALE || FEMALE || OTHERS)
      return res.status(400).json({ message: "please selecet your gender" });
    if (email === " ")
      return res.status(400).json({ message: "please fill your email" });
    if (dateOfBirth === " ")
      return res
        .status(400)
        .json({ message: "please fill your date of birth" });
    if (aboutMe === " ")
      return res
        .status(400)
        .json({ message: "please explain a bit about yourself " });
    if (searchLocation === " ")
      return res.stauts(400).json({ message: "please enter search location" });
    if (currentLocation === " ")
      return res
        .status(400)
        .json({ message: "please enter your current location " });

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );
    const account = await Account.create({
      firstName,
      password: hashedPassword,
    });

    const payload = { id: account.id, firstName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const account = await Account.findOne({
      where: { firstName } || { email },
    });
    if (!email)
      return res
        .status(400)
        .json({ meessage: "Login name or password is incorrect" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Login name or password is incorrect " });
    const payload = { id: account.id, firstName: account.firstName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

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
    res.status(200).json({ message: "update account successfully" });
  } catch (err) {
    next(err);
  }
};
