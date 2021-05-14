const express = require("express");
const matchController = require("../controllers/matchController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get(
  "/",
  // accountController.protect,
  matchController.getMatches
);

router.get(
  "/likedby",
  // accountController.protect,
  matchController.getLikedBy
);

router.post(
  "/",
  // accountController.protect,
  matchController.createMatch
);

router.patch(
  "/seen",
  // accountController.protect,
  matchController.seen
);

router.patch(
  "/returnlike",
  // accountController.protect,
  matchController.returnLike
);

router.delete(
  "/",
  // accountController.protect,
  matchController.unmatch
);

module.exports = router;
