const { findFood } = require("../dao/food.dao");
const { findByIdPartner } = require("../dao/foodpartner.doa");
const foodItemModel = require("../models/foodItem.model");
const foodPartnerModel = require("../models/foodpartner.model");
async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;
  console.log(foodPartnerId);
  const foodPartner = await findByIdPartner(foodPartnerId);

  const foodItemByFoodPartner = await findFood({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({
      message: "Food partner not found",
    });
  }
  res.status(201).json({
    message: "Food partner retrieved successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemByFoodPartner,
    },
  });
}

async function getLoggedInFoodPartner(req, res) {
  try {
    const foodPartnerId = req.foodPartner.id; // comes from JWT via auth middleware

    const foodPartner = await findByIdPartner(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    const foodItems = await findFood({ foodPartner: foodPartnerId });

    res.status(200).json({
      message: "Food partner profile retrieved successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems,
      },
    });
  } catch (err) {
    console.error("❌ Profile fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getFoodPartnerById,
  getLoggedInFoodPartner,
};
