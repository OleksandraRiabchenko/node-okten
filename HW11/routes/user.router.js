const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');
const {
    dbField,
    paramName,
    searchIn,
    userRolesEnum: { ADMIN, USER },
    validatorsName
} = require('../config');

router.get(
    '/',
    userController.getAllUsers
);
router.post(
    '/',
    userMiddleware.validateUserDinamic(validatorsName.user.createUser),
    fileMiddleware.checkAvatar,
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.throwIfUserPresent,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    authMiddleware.validateToken(),
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    userMiddleware.checkUserRoleAndID([
        ADMIN,
        USER
    ]),
    userController.deleteUser
);
router.put(
    '/:user_id',
    userMiddleware.validateUserDinamic(validatorsName.user.updateUser),
    fileMiddleware.checkAvatar,
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    authMiddleware.validateToken(),
    userMiddleware.checkThisUser,
    userController.updateUser
);

module.exports = router;
