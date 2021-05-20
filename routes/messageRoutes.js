const express = require("express");
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", authController.protect, messageController.getMessages);

router.post("/", authController.protect, messageController.storeMessages);

module.exports = router;
