const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const foodModel = mongoose.model("foodpartnerModel", foodPartnerSchema);

module.exports = foodModel;
