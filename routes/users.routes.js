const { Router } = require("express");
const { updateUser, deleteUser, getOrders, getOrder } = require("../controllers/users.controller");
const { protectAccountOwner, protect } = require("../middlewares/auth.middleware");
const { validOrderById } = require("../middlewares/order.middleware");
const { validIfExistUser} = require("../middlewares/user.middleware");
const { validateFields} = require("../middlewares/validateField.middleware");
const { updateUserValidation } = require("../middlewares/validations.middleware");


const router= Router();

router.get('/orders',protect, getOrders);

router.get('/orders/:id',protect, getOrder);


router.use(protect);

router.patch('/:id',updateUserValidation,validateFields,validIfExistUser,protectAccountOwner,updateUser
);

router.delete('/:id',validIfExistUser,protectAccountOwner, deleteUser);


module.exports={
    usersRouter: router,
}