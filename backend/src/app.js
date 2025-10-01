const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const foodItemRoutes = require("./routes/fooditem.route");
const foodpartnerRoutes = require("./routes/food-partner.route");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "hthttps://food-view-flame.vercel.app/",
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
