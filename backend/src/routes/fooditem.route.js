const express = require("express");
const {
  createFood,
  getFoodItems,
  saveFood,
  getSaveFood,
} = require("../controllers/foodItem.controller");
const {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} = require("../middlewares/auth.middleware");
const multer = require("multer");
const { createFoodValidator } = require("../validators/food.validator");
const { findFoodById } = require("../dao/food.dao");
const Like = require("../models/likes.model");
const { likeToggle } = require("../controllers/foodItem.controller");
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
router.get("/", authUserMiddleware, getFoodItems);

router.post("/like", authUserMiddleware, likeToggle);
router.post("/save", authUserMiddleware, saveFood);
router.get("/savedfood", authUserMiddleware, getSaveFood);


module.exports = router;
