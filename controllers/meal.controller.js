const Meal = require("../models/meal.model");
const Restaurant = require("../models/restaurant.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMeals = catchAsync(async (req, res, next) => {
const meals= await Meal.findAll({
    where:{
        status: 'active',
    },
    include: [
        {
            model: Restaurant
        }
    ]
});

res.status(200).json({
    status: 'success',
    message: 'The meals were found successfully',
    meals,
})
});

exports.getMeal = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const meal = await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
            model: Restaurant
        }
    ]
    });
  
    if (!meal) {
      return next(new AppError('Meal not found', 404));
    }
    
    res.status(200).json({
        status: 'success',
        message: 'The meal was found successfully',
        meal,
    })
});

exports.createMeal = catchAsync(async (req, res, next) => {
 const {restaurant}=req;
 const {name, price} = req.body;

 const newMeal= await Meal.create({
    name: name.toLowerCase(),
    price,
    restaurantId: restaurant.id
 })
 res.status(200).json({
    status: 'success',
    message: 'The meal was created successfully',
    newMeal,
})

});

exports.updateMeal = catchAsync(async (req, res, next) => {
    const {meal}=req;
    const {name, price}= req.body;

    const updatedMeal= await meal.update({
        name: name.toLowerCase(),
        price,
    });

    res.status(200).json({
        status: 'success',
        message: 'The meal was updated successfully',
        updatedMeal,
    })

});

exports.deleteMeal = catchAsync(async (req, res, next) => {
    const {meal}=req;

    await meal.update({status:'no active'});

    res.status(200).json({
        status: 'success',
        message: 'The meal was deleted successfully',
    })
});


