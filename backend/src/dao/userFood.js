const userModel = require("../models/user.model");

async function findByEmail(email) {
  return await userModel.findOne({ email });
}

async function findById(id) {
  return await userModel.findById(id);
}

async function create(userData) {
  return await userModel.create(userData);
}

async function deleteById(id) {
  return await userModel.findByIdAndDelete(id);
}

module.exports = {
  findByEmail,
  findById,
  deleteById,
  create,
};
