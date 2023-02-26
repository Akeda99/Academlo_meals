const { Router } = require("express");
const { createOrder, findOrders } = require("../controllers/orders.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const { validMealById } = require("../middlewares/meal.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");
const { orderPostValidation } = require("../middlewares/validations.middleware");

const router=Router();

router.get('/me',protect, findOrders);

router.post('/',protect,orderPostValidation,validateFields,validMealById, createOrder);

router.patch('/:id',protect,restrictTo('normal'))

router.delete('/:id',protect,restrictTo('normal'))

router.use(protect);

module.exports={
ordersRouter: router,
};