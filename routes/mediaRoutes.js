const express = require("express");
const mediaController = require("../controllers/mediaController");
const accountController = require("../controllers/accountController");
const { upload } = require("../middlewares/upload");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  authController.protect,
  mediaController.addPhoto
);


router.get("/", authController.protect, mediaController.getPhotos);


router.delete("/:id", authController.protect, mediaController.removePhoto);

module.exports = router;
