const express = require("express");
const { createFood } = require("../controllers/foodItem.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  stroage: multer.memoryStorage(),
});

//* POST  /api/food /[portected]
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);
module.exports = router;
