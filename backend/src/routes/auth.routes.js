const express = require("express");
const { route } = require("../app");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

module.exports = router;
