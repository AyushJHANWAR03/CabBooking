const drivers = new Map();
let driverIdSeq = 1;

function registerDriver(name, location) {
  const id = driverIdSeq++;

  const driver = {
    id,
    name,
    location,        
    available: true, 
  };

  drivers.set(id, driver);
  return driver;
}

function getDriverById(id) {
  return drivers.get(id) || null;
}

function getAvailableDrivers() {
  return Array.from(drivers.values()).filter(d => d.available);
}

function updateDriverLocation(driverId, location) {
  const driver = drivers.get(driverId);
  if (!driver) return null;

  driver.location = location;
  return driver;
}
function updateDriverAvailability(driverId, available) {
  const driver = drivers.get(driverId);
  if (!driver) return null;

  driver.available = available;
  return driver;
}

module.exports = {
  registerDriver,
  getDriverById,
  getAvailableDrivers,
  updateDriverLocation,
  updateDriverAvailability
};