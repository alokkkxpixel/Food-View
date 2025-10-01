const foodModel = require("../models/foodpartner.model");

async function findByEmailPartner(email) {
  return await foodModel.findOne({ email });
}

async function findByIdPartner(id) {
  return await foodModel.findById(id);
}

async function createPartner(foodPartnerData) {
  return await foodModel.create(foodPartnerData);
}

async function deleteByIdPartner(id) {
  return await foodModel.findByIdAndDelete(id);
}

module.exports = {
  findByEmailPartner,
  findByIdPartner,
  createPartner,
  deleteByIdPartner,
};
