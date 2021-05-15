const express = require("express");
const authController = require("../controllers/authController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get(
  "/myaccount",
  authController.protect,
  accountController.myAccount
);

router.get("/stack", authController.protect, accountController.generateStack);

router.get("/:id", authController.protect, accountController.accountById);

router.post("/currentlocation", authController.protect, accountController.currentLocation);



// router.put("/", accountController.protect, accountController.updateAccount);

module.exports = router;
