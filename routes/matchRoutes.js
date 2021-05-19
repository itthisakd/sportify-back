const express = require("express");
const matchController = require("../controllers/matchController");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, matchController.getMatches);

router.get("/likedby", authController.protect, matchController.getLikedBy);

router.post("/", authController.protect, matchController.createMatch);

router.patch("/seen", authController.protect, matchController.seen);

router.patch("/returnlike", authController.protect, matchController.returnLike);

router.delete("/:matchId", authController.protect, matchController.unmatch);

module.exports = router;
