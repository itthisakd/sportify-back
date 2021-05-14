const express = require("express");
const mediaController = require("../controllers/mediaController");
const accountController = require("../controllers/accountController");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/",
  // accountController.protect,
  upload.single("image"),
  mediaController.addPhoto
);


router.get(
  "/",
  // accountController.protect,
  mediaController.getPhotos
);


router.delete(
  "/:id",
  // accountController.protect,
  mediaController.removePhoto
);

module.exports = router;
