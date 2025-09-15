const express = require("express");
const { getFoodPartnerById } = require("../controllers/foodpartner.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

//* GET /api/food/foodpartner/:id [protected]
router.get("/:id", authFoodPartnerMiddleware, getFoodPartnerById);

module.exports = router;
