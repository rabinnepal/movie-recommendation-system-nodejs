const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");

// Models
const User = require("./models/user");

const { port } = require("./config/dotenv");
const sequelize = require("./config/sequelize");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

sequelize.sync({ force: false });
