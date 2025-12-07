// src/routes/riderRoutes.js
const express = require("express");
const riderController = require("../controllers/riderController");
const rideController = require("../controllers/rideController");

const router = express.Router();

// POST /riders
router.post("/", riderController.registerRider);

// POST /riders/:riderId/book
router.post("/:riderId/book", rideController.bookRide);

module.exports = router;