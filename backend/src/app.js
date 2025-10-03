const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const foodItemRoutes = require("./routes/fooditem.route");
const foodpartnerRoutes = require("./routes/food-partner.route");
const app = express();
require("dotenv").config();
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173", // or 3000 if React
  "https://food-view-flame.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodItemRoutes);
app.use("/api/food-partner", foodpartnerRoutes);

module.exports = app;
