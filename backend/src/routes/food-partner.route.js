const express = require("express");
const {
  getFoodPartnerById,
  getLoggedInFoodPartner,
} = require("../controllers/foodpartner.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

//* GET /api/food/foodpartner/:id [protected]
router.get("/profile", authFoodPartnerMiddleware, getLoggedInFoodPartner);
router.get("/:id", authFoodPartnerMiddleware, getFoodPartnerById);
module.exports = router;
