const express = require("express");
const sportController = require("../controllers/sportController");

const router = express.Router();

router.get(
  "/",
  // accountController.protect,
  sportController.getSports
);

module.exports = router;


const info4 = {
  method: "get",
  path: "/sports",
  pagesToBeUsedIn: ["RegisterPage", "EditInfoPage", "SettingsPage"],
  purpose: "to get sports to allow users to select",
  table: "get from SPORTS",
};
const output_sports = [
  { id: 1, sportName: "Basketball" },
  { id: 2, sportName: "Badminton" },
  { id: 3, sportName: "Tennis" },
  { id: 4, sportName: "Golf" },
  { id: 5, sportName: "Fencing" },
];