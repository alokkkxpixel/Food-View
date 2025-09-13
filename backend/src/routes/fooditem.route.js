const express = require("express");
const {
  createFood,
  getFoodItems,
} = require("../controllers/foodItem.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");
const { createFoodValidator } = require("../validators/food.validator");
const { findFoodById } = require("../dao/food.dao");
const router = express.Router();
const upload = multer({
  stroage: multer.memoryStorage(),
});

//* POST  /api/food /[portected]
router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  createFoodValidator,
  createFood
);

// * GET /api/food/ [protected]
router.get("/", authFoodPartnerMiddleware, getFoodItems);


module.exports = router;
