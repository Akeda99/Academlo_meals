
const Order = require('../models/order.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware function that is used to validate the category id. */
exports.validOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  req.order = order;
  next();
});