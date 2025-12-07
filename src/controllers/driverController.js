const driverService = require("../services/driverService");

async function registerDriver(req,res,next){
    try{
        const {name, location} = req.body;
        if(!name || !location){
            throw new Error("Name and location are required");
        }
        const driver = await driverService.registerDriver(name, location);
        res.status(201).json(driver);
    }catch(error){
        next(error);
    }
}

async function updateDriverLocation(req, res, next) {
  try {
    const driverId = Number(req.params.driverId);
    const location = req.body; // { x, y }

    if (Number.isNaN(driverId)) {
      return res.status(400).json({ message: "Invalid driverId" });
    }

    if (
      location == null ||
      typeof location.x !== "number" ||
      typeof location.y !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Location with x and y is required" });
    }

    const driver = driverService.updateDriverLocation(driverId, location);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    return res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
}

async function updateDriverAvailability(req, res, next) {
  try {
    const driverId = Number(req.params.driverId);
    const { available } = req.query; 

    if (Number.isNaN(driverId)) {
      return res.status(400).json({ message: "Invalid driverId" });
    }

    // validate available query param
    if (available !== "true" && available !== "false") {
      return res.status(400).json({
        message: "Query param 'available' must be 'true' or 'false'",
      });
    }

    const availableBool = available === "true";

    const driver = driverService.updateDriverAvailability(
      driverId,
      availableBool
    );

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // MD said 200/204 – returning 200 with updated driver helps debugging
    return res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
}

module.exports = {
    registerDriver,
    updateDriverLocation,
    updateDriverAvailability
}
