const foodItemModel = require("../models/foodItem.model");

async function createFood(req, res) {
  console.log(req.foodPartner);
  console.log(req.file);
  console.log(req.body);
  res.send("food item created ");
}

module.exports = {
  createFood,
};
