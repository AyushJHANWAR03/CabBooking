// src/services/rideService.js
const riderService = require("./riderService");
const driverService = require("./driverService");

// in-memory store for rides
const rides = new Map();
let rideIdSeq = 1;

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Book a ride for a rider at a given pickup location.
 * - validate rider
 * - find nearest available driver
 * - mark driver unavailable
 * - create ONGOING ride
 */
function bookRide(riderId, pickupLocation) {
  const rider = riderService.getRiderById(riderId);
  if (!rider) {
    const err = new Error("Rider not found");
    err.status = 404;
    throw err;
  }

  const availableDrivers = driverService.getAvailableDrivers();
  if (availableDrivers.length === 0) {
    const err = new Error("No cabs available");
    err.status = 404;
    throw err;
  }

  let nearestDriver = null;
  let minDist = Infinity;

  for (const driver of availableDrivers) {
    if (!driver.location) continue;
    const d = distance(driver.location, pickupLocation);
    if (d < minDist) {
      minDist = d;
      nearestDriver = driver;
    }
  }

  if (!nearestDriver) {
    const err = new Error("No cabs available");
    err.status = 404;
    throw err;
  }

  // mark driver unavailable
  nearestDriver.available = false;

  const id = rideIdSeq++;
  const ride = {
    id,
    rider,
    driver: nearestDriver,
    startLocation: pickupLocation,
    endLocation: null,
    status: "ONGOING",
  };

  rides.set(id, ride);
  return ride;
}

function getRideById(id) {
  return rides.get(id) || null;
}

function getRidesByRiderId(riderId) {
  return Array.from(rides.values()).filter(
    (ride) => ride.rider.id === riderId
  );
}

function endRide(rideId, dropLocation) {
  const ride = rides.get(rideId);
  if (!ride) {
    const err = new Error("Ride not found");
    err.status = 404;
    throw err;
  }

  ride.endLocation = dropLocation;
  ride.status = "COMPLETED";

  // free the driver
  if (ride.driver) {
    ride.driver.available = true;
  }

  return ride;
}

module.exports = {
  bookRide,
  getRideById,
  getRidesByRiderId,
  endRide
};