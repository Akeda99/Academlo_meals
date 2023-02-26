
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware function that is used to validate the category id. */
exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});