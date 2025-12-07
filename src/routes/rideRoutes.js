// src/routes/rideRoutes.js
const express = require("express");
const rideController = require("../controllers/rideController");

const router = express.Router();

// POST /rides/:rideId/end
router.post("/:rideId/end", rideController.endRide);

module.exports = router;