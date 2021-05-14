const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.googleLogin);
router.post("/register", authController.register);



module.exports = router;
