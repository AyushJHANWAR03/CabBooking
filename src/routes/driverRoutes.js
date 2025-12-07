// src/routes/driverRoutes.js
const express = require("express");
const driverController = require("../controllers/driverController");

const router = express.Router();

// POST /drivers
router.post("/", driverController.registerDriver);

router.put("/:driverId/location", driverController.updateDriverLocation);

router.put("/:driverId/availability", driverController.updateDriverAvailability);

module.exports = router;