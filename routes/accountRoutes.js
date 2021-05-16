const express = require("express");
const authController = require("../controllers/authController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get(
  "/myaccount",
  authController.protect,
  accountController.myAccount
);

router.patch("/myaccount", authController.protect, accountController.editMyAccount);

router.get("/stack", authController.protect, accountController.generateStack);

router.get("/:id", authController.protect, accountController.accountById);

router.patch("/currentlocation", authController.protect, accountController.currentLocation);

module.exports = router;
