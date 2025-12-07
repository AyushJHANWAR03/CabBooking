// src/controllers/rideController.js
const rideService = require("../services/rideService");

// POST /riders/:riderId/book
async function bookRide(req, res, next) {
  try {
    const riderId = Number(req.params.riderId);
    const pickupLocation = req.body; // { x, y }

    if (Number.isNaN(riderId)) {
      return res.status(400).json({ message: "Invalid riderId" });
    }

    if (
      pickupLocation == null ||
      typeof pickupLocation.x !== "number" ||
      typeof pickupLocation.y !== "number"
    ) {
      return res.status(400).json({
        message: "Pickup location with numeric x and y is required",
      });
    }

    const ride = rideService.bookRide(riderId, pickupLocation);

    return res.status(201).json({
      rideId: ride.id,
      riderId: ride.rider.id,
      driverId: ride.driver.id,
      status: ride.status,
    });
  } catch (err) {
    next(err);
  }
}

async function endRide(req, res, next) {
  try {
    const rideId = Number(req.params.rideId);
    const dropLocation = req.body; // { x, y }

    if (Number.isNaN(rideId)) {
      return res.status(400).json({ message: "Invalid rideId" });
    }

    if (
      dropLocation == null ||
      typeof dropLocation.x !== "number" ||
      typeof dropLocation.y !== "number"
    ) {
      return res.status(400).json({
        message: "Drop location with numeric x and y is required",
      });
    }

    const ride = rideService.endRide(rideId, dropLocation);

    return res.status(200).json({
      rideId: ride.id,
      status: ride.status,
    });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  bookRide,
  endRide
};