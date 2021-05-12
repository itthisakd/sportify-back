const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

// router.post("/", accountController.register);
// router.post("/", accountController.login);

router.get(
  "/myaccount",
  // accountController.protect,
  accountController.myAccount
);
// router.put("/", accountController.protect, accountController.updateAccount);

module.exports = router;
