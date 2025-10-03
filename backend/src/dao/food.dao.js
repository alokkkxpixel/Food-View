const foodItemModel = require("../models/foodItem.model");

async function createFoodItem(data) {
  return await foodItemModel.create(data);
}

async function findFoodById(id) {
  return await foodItemModel.findById(id);
}
async function findFood(data) {
  return await foodItemModel.find(data);
}

module.exports = {
  createFoodItem,
  findFoodById,
  findFood,
};
