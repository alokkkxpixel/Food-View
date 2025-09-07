const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);

module.exports = app;
