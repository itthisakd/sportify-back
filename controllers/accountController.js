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
      return res.status(401).json({ message: "ํYOU ARE UNAUTHORIZED" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //FIXME JOIN TABLE HERE TO GIVE data_account as shown below
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

// FIXME login by google account
const data_account = {
  id: 1,
  firstName: "Amy",
  gender: "female",
  phoneNumber: "0925419369",
  email: "amy@gmail.com",
  dob: "2001-09-09",
  aboutMe:
    "I am nice because I am veyr very nice and also extremely kind and nice.",
  instagram: "amylee",
  sporify: "samy",
  job: "",
  company: "",
  school: "Clerk County College",
  searchLocation: "",
  searchDistance: 45,
  searchAge: "18-40",
  searchGender: "a",
  currentLocation: "",
  lastActive: "2020-09-0900:00:09",
  showActive: 1,
  showInStack: 1,

  //––––––––––––––––––––––––––FROM SEPERATE TABLE––––––––––––––––––––––––
  planName: "lite",
  planId: "1",
  sports: [
    { id: 1, sportName: "Basketball" },
    { id: 3, sportName: "Badminton" },
    { id: 6, sportName: "Tennis" },
    { id: 7, sportName: "Golf" },
    { id: 96, sportName: "Fencing" },
  ],
  images: [
    {
      image:
        "https://i.picsum.photos/id/1002/600/900.jpg?hmac=4BSgpJzasHKS9vEgQ_Kn3WUjgvc1sUZv-E10bf1bCyA",
    },
    {
      image:
        "https://i.picsum.photos/id/277/600/900.jpg?hmac=0SZDnUgJesoCsIFVR9u9uG9hUC3dQOxx0_pgop-aIoY",
    },
    {
      image:
        "https://i.picsum.photos/id/705/600/900.jpg?hmac=19EE_8IKXcp7maJfLind1IgeEHKHlpbeSbN6o5uydJY",
    },
    //GIVE IMAGES IN UPLOADED ORDER
  ],

  //––––––––––––––––––––––––––GENERATED–––––––––––––––––––––––––
  recentlyActive: 1,
  //–––––––––––––––––
  // distance: "6km",
  age: 18,
  locationName: "Bangkok, Thailand",
  // age: DateTime.now().diff(DateTime.fromISO(this.dob), "years"),
};

exports.myAccount = async (req, res, next) => {
  try {
    const { userId } = req.user
    const user = await Account.findOne({
      where: { id: userId },
    });

    
    res.status(200).json({ todo: "INSERT completed data here"
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
    res.status(200).json({ message: "Update account successfully" });
  } catch (err) {
    next(err);
  }
};
