const express = require('express');
const riderRoutes = require("./routes/riderRoutes");
const driverRoutes = require("./routes/driverRoutes");
const rideRoutes = require("./routes/rideRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use("/riders", riderRoutes);
app.use("/drivers", driverRoutes);
app.use("/rides", rideRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
