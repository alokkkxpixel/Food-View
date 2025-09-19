const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  deleteUser,
} = require("../controllers/auth.controller");
const {
  registerUserValidator,
  registerFoodPartnerValidator,
} = require("../validators/auth.validator");
const { validate } = require("../middlewares/validate");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), // ✅ fixed the typo
});

// Router of User API
router.post(
  "/user/register",
  upload.single("image"), // 👈 MUST match file key name in form-data
  registerUserValidator,
  validate,
  registerUser
);

router.delete("/user/:id", deleteUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

//ROuter of food Partner API
router.post(
  "/foodpartner/register",
  upload.single("image"),
  registerFoodPartnerValidator,
  validate,
  registerFoodPartner
);
router.post("/foodpartner/login", loginFoodPartner);
router.post("/foodpartner/logout", logoutFoodPartner);
module.exports = router;
