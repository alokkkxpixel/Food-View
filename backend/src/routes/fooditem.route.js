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
router.get("/", getFoodItems);
router.get("/:id", findFoodById);
module.exports = router;
