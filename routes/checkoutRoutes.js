const express = require("express");
const checkOutController = require("../controllers/checkOutController");

const router = express.Router();

router.post("/checkout-credit-card", checkOutController.createCharge);

module.exports = router;
