const express = require("express");

const router = express.Router();

//* GET /api/food/foodpartner/:id [protected]
router.get("/foodpartner/:id", findFoodById);

module.exports = router;
