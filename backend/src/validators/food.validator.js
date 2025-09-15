// validators/food.validator.js
const { body } = require("express-validator");

exports.createFoodValidator = [
  body("name")
    .notEmpty()
    .withMessage("Food name is required")
    .isLength({ min: 3 })
    .withMessage("Food name must be at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price of the porduct is Reqiured")
    .isLength({ min: 2 })
    .withMessage("price  must be at least 2 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
];
