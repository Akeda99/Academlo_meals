
const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware function that is used to validate the category id. */
exports.validMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  req.meal = meal;
  next();
});