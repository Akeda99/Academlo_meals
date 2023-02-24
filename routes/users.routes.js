const { Router } = require("express");
const { updateUser, deleteUser } = require("../controllers/users.controller");
const { protectAccountOwner, protect } = require("../middlewares/auth.middleware");
const { validIfExistUser} = require("../middlewares/user.middleware");
const { validateFields} = require("../middlewares/validateField.middleware");
const { updateUserValidation } = require("../middlewares/validations.middleware");


const router= Router();

// router.get('/orders', getOrders);

// router.get('/orders/:id',validIfExistUser, getOrder);
// lo de orders tenemos que hacerlo con model creo ahi vemos
// Falta poner el post signup y Login pero creo que eso tenemos que ponerlo en Auth, tenemos que el borrar el post de abajo

router.use(protect);

router.patch('/:id',
updateUserValidation,
validateFields,
validIfExistUser,
protectAccountOwner,
updateUser
);

router.delete('/:id',validIfExistUser,protectAccountOwner, deleteUser);


module.exports={
    usersRouter: router,
}