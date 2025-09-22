const { validationResult } = require("express-validator");
const foodItemModel = require("../models/foodItem.model");
const {
  uploadFile,
  deleteFromImageKit,
} = require("../service/stroage.service");
const { v4: uuid } = require("uuid");
const foodDao = require("../dao/food.dao");
const LikeModel = require("../models/likes.model");
const saveModel = require("../models/saveFood.model");
const userModel = require("../models/user.model");

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
    // Before creating food item
    if (!req.foodPartner || !req.foodPartner._id) {
      return res
        .status(400)
        .json({ message: "Food partner not found or not authenticated." });
    }
    // Save food item
    const foodItem = await foodDao.createFoodItem({
      name: req.body.name, // ✅ use req.body instead of req.name
      description: req.body.description, // ✅ fixed typo (was req.decription)
      price: req.body.price,
      video: fileUploadedResult.url,
      fileId: fileUploadedResult.fileId,
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
  const user = req.user;
  console.log(user);
  const foodItems = await foodItemModel.find({});

  res.status(200).json({
    message: "Food items feteched successfully!!",
    foodItems,
    user,
  });
}
async function likeToggle(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  if (!user || !user._id) {
    return res
      .status(400)
      .json({ message: "User not found or not authenticated." });
  }

  const isAlreadyLiked = await LikeModel.findOne({
    user: user._id,
    food: foodId, // ✅ consistent everywhere
  });

  if (isAlreadyLiked) {
    await LikeModel.deleteOne({ user: user._id, food: foodId });
    await foodItemModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
    return res.status(200).json({ message: "Food unliked successfully" });
  }

  const like = await LikeModel.create({ user: user._id, food: foodId });
  await foodItemModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

  res.status(201).json({ message: "Food liked successfully", like });
}

// Toggle Save Food
async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  // 1️⃣ Check if user is authenticated
  if (!user || !user._id) {
    return res
      .status(400)
      .json({ message: "User not found or not authenticated." });
  }

  try {
    // 2️⃣ Check if the food is already saved by this user
    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadySaved) {
      // 3️⃣ If already saved, unsave it
      await saveModel.deleteOne({ user: user._id, food: foodId });
      await foodItemModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: -1 },
      });
      return res
        .status(200)
        .json({ message: "Food unsaved successfully", saved: false });
    }

    // 4️⃣ If not saved, save it
    const saved = await saveModel.create({ user: user._id, food: foodId });
    await foodItemModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    return res
      .status(201)
      .json({ message: "Food saved successfully", saved: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
}

async function getSaveFood(req, res) {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({
      message: "No saved Food found!",
    });
  }

  res.status(200).json({
    message: "Saved retrived successfully",
    savedFoods,
    user,
  });
}

// DELETE /api/food/:id
async function deleteFood(req, res) {
  try {
    const { id } = req.params; // foodId from frontend
    console.log(id);
    // 1. Find the food in DB
    const food = await foodItemModel.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    console.log("food", food._id);
    // 2. Delete file from ImageKit first (if fileId exists)
    await deleteFromImageKit(food.fileId);

    // 3. Delete from MongoDB
    await foodItemModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (err) {
    console.error("❌ Delete food error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateFoodPrice(req, res) {
  try {
    const { id } = req.params; // Food ID
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const food = await foodItemModel.findByIdAndUpdate(
      id,
      { price },
      { new: true } // return updated doc
    );

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ success: true, message: "Price updated", food });
  } catch (err) {
    console.error("Update price error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeToggle,
  saveFood,
  getSaveFood,
  deleteFood,
  updateFoodPrice,
};
