const express = require("express");
const { route } = require("../app");
const {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require("../controllers/auth.controller");
const {
  registerUserValidator,
  registerFoodPartnerValidator,
} = require("../validators/auth.validator");
const { validate } = require("../middlewares/validate");

const router = express.Router();

//Router of User API
router.post("/user/register", registerUserValidator, validate, registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

//ROuter of food Partner API
router.post(
  "/foodpartner/register",
  registerFoodPartnerValidator,
  validate,
  registerFoodPartner
);
router.post("/foodpartner/login", loginFoodPartner);
router.post("/foodpartner/logout", logoutFoodPartner);
module.exports = router;
