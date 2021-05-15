const express = require("express");
const sportController = require("../controllers/sportController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get(
  "/",
  // accountController.protect,
  sportController.getSports
);

router.post(
  "/",
  // accountController.protect,
  sportController.editUserSports
);

module.exports = router;