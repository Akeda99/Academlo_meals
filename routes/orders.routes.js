const { Router } = require("express");
const { createOrder, findOrders, updateOrder, deleteOrder } = require("../controllers/orders.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const { validMealById } = require("../middlewares/meal.middleware");
const { validOrderById } = require("../middlewares/order.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");
const { orderPostValidation } = require("../middlewares/validations.middleware");

const router=Router();

router.get('/me',protect, findOrders);

router.post('/',orderPostValidation,validateFields,protect, createOrder);

router.patch('/:id',validOrderById,protect,updateOrder)

router.delete('/:id',validOrderById,protect,deleteOrder)

router.use(protect);

module.exports={
ordersRouter: router,
};