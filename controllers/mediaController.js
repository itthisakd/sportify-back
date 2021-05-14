const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: "itthisakd",
  api_key: "161784557926796",
  api_secret: "A_OyWIsFkAC_OeDer1w9dRYtEqg",
});
const { sequelize, Media } = require("../models");
const util = require("util");
const upload = util.promisify(cloudinary.uploader.upload);

exports.addPhoto = async (req, res, next) => {
  try {
    // const { userId } = req.user;
    const userId = 1;
    console.log("req.file :>> ", req.file);

    
    // TODO CROP IMAGE TO CLOUDINARY
    const result = await upload(req.file.path);
    fs.unlinkSync(req.file.path);
    const media = result.secure_url;

    await Media.create({ accountId: userId, media });

    res.status(200).json({ message: "Added media successfully" });
  } catch (err) {
    next(err);
  }
};



exports.removePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Media.destroy({ where: { id } });

    res.status(200).json({ message: "Deleted media successfully" });
  } catch (err) {
    next(err);
  }
};



exports.getPhotos = async (req, res, next) => {
  try {
    // const userId = req.user.userId;
    const userId = 1;

    const raw = await Media.findAll({
      where: { accountId: userId },
      order: [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ],
    });
    const images = raw.map((image) => {
      return { id: image.id, image: image.media };
    });

    res.status(200).json({ images });
  } catch (err) {
    next(err);
  }
};
