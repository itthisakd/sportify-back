const express = require("express");
const mediaController = require("../controllers/mediaController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post(
  "/",
  // accountController.protect,
  upload.single("image"),
  mediaController.addPhoto
);

router.delete(
  "/",
  // accountController.protect,
  mediaController.removePhoto
);

module.exports = router;
