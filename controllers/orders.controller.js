
const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* Creating a order. */
exports.createOrder = catchAsync(async (req, res, next) => {
  const {sessionUser} = req;
  const { quantity, mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  totalPrice= meal.price * quantity;

  const order = await Order.create({ 
    quantity, 
    mealId, 
    totalPrice,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});


exports.findOrders = catchAsync(async (req, res, next) => {

  const { sessionUser } = req;
  const orders = await Order.findAll({
    attributes: {exclude: ['createdAt','updatedAt']},
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        attributes: {exclude: ['createdAt','updatedAt']},
      include: [
        {
          model: Restaurant,
          attributes: {exclude: ['createdAt','updatedAt']},
        },
      ],
    },
  ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders found successfully',
    orders,
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
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status:'cancelled'});

  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});