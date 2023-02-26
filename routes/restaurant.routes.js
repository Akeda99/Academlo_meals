const { Router } = require("express");
const { createRestaurant, findRestaurants, findRestaurant, updateRestaurant, deleteRestaurant, createReview, patchReview, deleteReview } = require("../controllers/restaurant.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const { validRestaurantById } = require("../middlewares/restaurant.middleware");
const { validReviewById } = require("../middlewares/review.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");
const { RestaurantPostValidation } = require("../middlewares/validations.middleware");

const router=Router();

router.get('/',findRestaurants)

router.get('/:id',findRestaurant)

router.post('/',RestaurantPostValidation,validateFields, protect,restrictTo('admin'),createRestaurant)

router.patch('/:id',validRestaurantById,protect,restrictTo('admin'),updateRestaurant)

router.delete('/:id',validRestaurantById,protect,restrictTo('admin'),deleteRestaurant)


// hacer un validation para el post
router.post('/reviews/:id',validRestaurantById,protect,createReview  )

router.patch('/reviews/:restaurantId/:id',validReviewById, protect, patchReview)

router.delete('/reviews/:restaurantId/:id',validReviewById, protect,deleteReview)





module.exports={
    restaurantsRouter: router,
}