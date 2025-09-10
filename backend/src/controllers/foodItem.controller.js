const { validationResult } = require("express-validator");
const foodItemModel = require("../models/foodItem.model");
const { uploadFile } = require("../service/stroage.service");
const { v4: uuid } = require("uuid");
const foodDao = require("../dao/food.dao");

async function createFood(req, res) {
  // ✅ Check validation errors first
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // ✅ Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Food video file is required" });
    }

    // Upload file
    const fileUploadedResult = await uploadFile(req.file.buffer, uuid());

    // Save food item
    const foodItem = await foodDao.createFoodItem({
      name: req.body.name, // ✅ use req.body instead of req.name
      description: req.body.description, // ✅ fixed typo (was req.decription)
      video: fileUploadedResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodItemModel.find({});

  res.status(200).json({
    message: "Food items feteched successfully!!",
    foodItems,
  });
}
module.exports = {
  createFood,
  getFoodItems,
};
