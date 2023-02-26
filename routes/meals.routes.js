const { Router } = require("express");
const { deleteMeal, updateMeal, createMeal, getMeal, getMeals } = require("../controllers/meal.controller");
const { protectAccountOwner, protect, restrictTo } = require("../middlewares/auth.middleware");
const { validMealById } = require("../middlewares/meal.middleware");
const { validRestaurantById } = require("../middlewares/restaurant.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");
const { MealPostValidation } = require("../middlewares/validations.middleware");
const router=Router();


router.get('/', getMeals)

router.get('/:id',getMeal )

router.post('/:id',  MealPostValidation,validateFields, validRestaurantById ,protect, restrictTo('admin'),createMeal)

router.patch('/:id',validMealById, protect, restrictTo('admin'), updateMeal)

router.delete('/:id',validMealById,protect,restrictTo('admin'), deleteMeal)

router.use(protect)



module.exports={
    mealsRouter: router,
}