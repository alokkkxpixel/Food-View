const foodItemModel = require("../models/foodItem.model");

async function createFoodItem(data) {
  return await foodItemModel.create(data);
}

async function findFoodById(id) {
  return await foodItemModel.findById(id);
}

module.exports = {
  createFoodItem,
  findFoodById,
};
