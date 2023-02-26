
const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* Creating a order. */
exports.createOrder = catchAsync(async (req, res, next) => {

  const { quantity, mealId } = req.body;

  const {meal=mealId}= req; 
  if(!meal){
    return next(new AppError('Meal not found'), 401)
  }

  totalPrice= meal.price * quantity;

  const order = await Order.create({ quantity, mealId, totalPrice });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});


exports.findOrders = catchAsync(async (req, res, next) => {

  const { sessionUser } = req;
  const orders = await Order.findAll({
    attributes: ['id', 'mealId', 'quantity', 'totalPrice'],
    where: {
      userId: sessionUser.id,
      status: true,
    },
    include: [
      {
        model: Meal,
      },
      include[
        {

          model: Restaurant,
        }
      ]
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'Categories fetched successfully',
    orders,
  });
});


/* This is a middleware function that is used to fetch a order by its id. */
exports.updateOrder = catchAsync(async (req, res, next) => {

  const { order } = req;
  
  if (order.status!=='active') {
    return next(new AppError('Order not found', 404));
  }

  await order.update({ status:'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
  });
});

/* Deleting the order. */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (order.status!=='active') {
    return next(new AppError('Order not found', 404));
  }

  await order.update({ status:'cancelled'});

  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});