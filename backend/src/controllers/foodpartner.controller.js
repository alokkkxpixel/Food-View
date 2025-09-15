const foodItemModel = require("../models/foodItem.model");
const foodPartnerModel = require("../models/foodpartner.model");
async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;
  console.log(foodPartnerId);
  const foodPartner = await foodPartnerModel.findById(foodPartnerId);

  const foodItemByFoodPartner = await foodItemModel.find({
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

module.exports = {
  getFoodPartnerById,
};
