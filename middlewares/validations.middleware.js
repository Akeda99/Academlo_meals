const { check } = require('express-validator');

exports.createProductValidation = [
  check('title', 'The title is required').not().isEmpty(),
  check('description', 'The description is required').not().isEmpty(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
  check('categoryId', 'The categoryId is required').not().isEmpty(),
  check('categoryId', 'The categoryId must be a number').isNumeric(),
  check('userId', 'The userId is required').not().isEmpty(),
  check('userId', 'The userId must be a number').isNumeric(),
];

exports.updateProductValidation = [
  check('title', 'The title is required').not().isEmpty(),
  check('description', 'The description is required').not().isEmpty(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
];

exports.updateUserValidation = [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
];


exports.addProductToCartValidation = [
  check('mealId', 'The producId is required').not().isEmpty(),
  check('productId', 'The producId must be a number').isNumeric(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
];

exports.updateProductToCartValidation = [
  check('productId', 'The producId is required').not().isEmpty(),
  check('productId', 'The producId must be a number').isNumeric(),
  check('newQty', 'The quantity is required').not().isEmpty(),
  check('newQty', 'The quantity must be a number').isNumeric(),
];

exports.registerUserValidation = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.loginUserValidation = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.orderPostValidation=[
  check('mealId', 'The mealId is required').not().isEmpty(),
  check('mealId', 'The mealId must be a number').isNumeric(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
];

exports.MealPostValidation=[
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
  check('name', 'The name is required').not().isEmpty(),
];

exports.RestaurantPostValidation=[
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number  must be a number between 1 and 5').isNumeric(),
  check('rating', 'The rating must be a number between 1 and 5').isInt({min: 1, max:5}),
]