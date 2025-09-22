const express = require("express");
const {
  createFood,
  getFoodItems,
  saveFood,
  getSaveFood,
  deleteFood,
  updateFoodPrice,
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
  storage: multer.memoryStorage(), // ✅ fixed the typo
});

//* POST  /api/food /[portected]
router.post(
  "/",
  upload.single("video"),
  authFoodPartnerMiddleware,
  createFoodValidator,
  createFood
);

// * GET /api/food/ [protected]
router.get("/", authUserMiddleware, getFoodItems);
router.delete("/:id", deleteFood);
router.put("/:id/price", updateFoodPrice);
router.post("/like", authUserMiddleware, likeToggle);
router.post("/save", authUserMiddleware, saveFood);
router.get("/savedfood", authUserMiddleware, getSaveFood);


module.exports = router;
