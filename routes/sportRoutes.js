const express = require("express");
const sportController = require("../controllers/sportController");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController")

const router = express.Router();

router.get(
  "/",
  authController.protect,
  sportController.getSports
);

router.get("/user", authController.protect, sportController.getUserSports);

router.post("/", authController.protect, sportController.editUserSports);



module.exports = router;