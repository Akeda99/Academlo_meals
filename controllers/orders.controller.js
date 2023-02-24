
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

/* Creating a order. */
exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;

  const order = await Order.create({ quantity, mealId });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});


exports.findOrders = catchAsync(async (req, res, next) => {
  const categories = await Order.findAll({
    attributes: ['id', 'mealId', 'quantity', 'totalPrice'],
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Categories fetched successfully',
    categories,
  });
});


/* This is a middleware function that is used to fetch a order by its id. */
exports.updateOrder = catchAsync(async (req, res, next) => {

  const { order } = req;

  await order.update({ status:'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
  });
});

/* Deleting the order. */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status:'cancelled'});

  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});