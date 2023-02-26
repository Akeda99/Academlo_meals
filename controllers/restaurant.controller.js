const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createRestaurant = catchAsync(async (req, res, next) => {
    const {name, address, rating}=req.body;

    const restaurant = await Restaurant.create({name, address, rating});

    res.status(201).json({
        status: 'success',
        message: 'Restaurant created successfully',
        restaurant,
      });
});

exports.findRestaurants = catchAsync(async (req, res, next) => {
const restaurant = await Restaurant.findAll({
    where: {
        status: 'active',
    },
    include: [
        {
            model: Review,
                where: {
                    status: 'active',
                },
            required: false,
        }
    ]
});
res.status(200).json({
    status: 'success',
    message: 'Restaurants found successfully',
    restaurant,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
            model: Review,
            
            where: {
                status: 'active',
            },
            required: false,
        },
    ],
    });
  
    if (!restaurant) {
      return next(new AppError('Restaurant not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Restaurant found successfully',
        restaurant,
      });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
    const {restaurant} = req;
    const {name, address} = req.body;

    await restaurant.update({name, address});

    res.status(200).json({
        status: 'success',
        message: 'Restaurant updated successfully',
      });
});

exports.deleteRestaurant= catchAsync(async (req, res, next) => {
    const {restaurant} = req;

    await restaurant.update({status: 'no active'});

    res.status(200).json({
        status: 'success',
        message: 'Restaurant updated successfully',
      });
});

// reviews

exports.createReview= catchAsync(async (req, res, next) => {
    
    const {sessionUser}=req;

    const {restaurant}=req;

    const {comment,rating}=req.body;

    const review = await Review.create({ 
    comment, 
    rating, 
    restaurantId: restaurant.id,
    userId: sessionUser.id,
});

    res.status(201).json({
        status: 'success',
        message: 'Review created successfully',
        review,
      });
});

exports.patchReview= catchAsync(async (req, res, next) => {

    const {restaurantId}=req.params;

    const {review}=req;

    const {comment,rating}=req.body;

   await review.update({ 
    comment, 
    rating,
    restaurantId,
});

    res.status(201).json({
        status: 'success',
        message: 'Review updated successfully',
      });
});

exports.deleteReview= catchAsync(async (req, res, next) => {
    const {restaurantId}=req.params;

    const {review}=req;

   await review.update({ 
        status: 'deleted',
        restaurantId,
});

    res.status(201).json({
        status: 'success',
        message: 'Review updated successfully',
      });
});