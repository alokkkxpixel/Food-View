const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuid } = require("uuid");

const foodModel = require("../models/foodpartner.model");
const {
  uploadFile,
  deleteFromImageKit,
} = require("../service/stroage.service");
const {
  create,
  findByEmail,
  deleteById,
  findById,
} = require("../dao/userFood");
const {
  findByEmailPartner,
  findByIdPartner,
  deleteByIdPartner,
} = require("../dao/foodpartner.doa");
dotenv.config();
async function registerUser(req, res) {
  const { fullname, email, password } = req.body;
  const isUserAlreadyExist = await findByEmail(email);
  if (!req.file) {
  }
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User is already Exist" });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const fileUploadedResult = await uploadFile(req.file.buffer, uuid());
  const userdata = {
    fullname,
    image: fileUploadedResult.url,
    fileId: fileUploadedResult.fileId,
    email,
    password: hashPassword,
  };
  const user = await create(userdata);

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User register Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullaname: user.fullname,
      image: user.image,
      fileId: user.fileId,
    },
  });
}
async function deleteUser(req, res) {
  const user = await findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });

  await deleteFromImageKit(user.fileId);
  await deleteById(user._id);

  res.json({ success: true, message: "User deleted" });
}
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await findByEmail({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invaild email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invaild email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Loging successfulyy!!",
    user,
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logout successfully!!",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phoneNo, address, contactName } = req.body;
  const isFoodpartnerExist = await findByEmailPartner(email);

  if (isFoodpartnerExist) {
    return res.status(400).json({
      message: "Your Food Partner Account is already existed!",
    });
  }
  if (!req.file) {
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const fileUploadedResult = await uploadFile(req.file.buffer, uuid());
  const foodPartner = await createPartner({
    name,
    email,
    image: fileUploadedResult.url,
    fileId: fileUploadedResult.fileId,
    password: hashPassword,
    phoneNo,
    address,
    contactName,
  });
  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "Your Foodpartner Account is created successfully!",
    user: {
      _id: foodPartner._id,
      email: foodPartner.email,
      image: foodPartner.image,
      fileId: foodPartner.fileId,
      name: foodPartner.name,
      address: foodPartner.address,
      Phone_no: foodPartner.phoneNo,
      contactName: foodPartner.contactName,
    },
  });
}

async function deleteFoodPartner(req, res) {
  const { id } = req.params;

  const foodPartnerId = await findByIdPartner(id);

  if (!foodPartnerId) {
    return res.status(404).json({
      message: "Food partner not founed",
    });
  }

  await deleteFromImageKit(foodPartnerId.fileId);

  const deletedFoodPartner = await deleteByIdPartner(foodPartnerId._id);

  return res.status(201).json({
    message: "foodpartner deleted",
    deletedFoodPartner,
  });
}
async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodpartner = await findByEmailPartner({
    email,
  });

  if (!foodpartner) {
    return res.status(400).json({
      message: "Inavaild email or password",
    });
  }

  const isFoodpartnerExist = await bcrypt.compare(
    password,
    foodpartner.password
  );

  if (!isFoodpartnerExist) {
    return res.status(400).json({
      message: "Inavaild email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "Foodpartner login successfully!!",
    foodPartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
    },
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "FoodPartner logout successfully!!",
  });
}

module.exports = {
  registerUser,
  deleteUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  deleteFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
