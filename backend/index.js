require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shipmentRoutes = require("./routes/shipmentRoutes");
const errorHandler = require("./utils/errorHandler"); // Ensure this is a valid function

const app = express();

app.use(cors()); // Ensure cors is a valid middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use("/api", shipmentRoutes); // Ensure shipmentRoutes is a valid router
app.use(errorHandler); // Ensure errorHandler is a valid middleware function

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
