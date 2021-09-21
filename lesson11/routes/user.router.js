const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddleware, fileMiddleware } = require('../middleWares');
const {
    // checkUniqueEmail,
    validateUserBody,
   // checkUserRoleMdlwr,
    getUserbyDynamicParam,
    throwIfUserPresent,
    throwIfUserNotPresent
} = require('../middleWares/user.middleware');
// const { ADMIN } = require('../config/user-roles.enum');

router.post(
    '/',
    validateUserBody,
    fileMiddleware.checkAvatar,
    // checkUniqueEmail,
    getUserbyDynamicParam('email'),
    throwIfUserPresent,
    userController.createUser
);
router.get(
    '/',
    userController.getAllUser
);
router.get(
    '/:user_id',
    getUserbyDynamicParam('user_id', 'params', '_id'),
    throwIfUserNotPresent,
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    authMiddleware.validateAccessToken,
    getUserbyDynamicParam('user_id', 'params', '_id'),
    throwIfUserNotPresent,
    // checkUserRoleMdlwr([ADMIN]),
    userController.deleteUser
);

module.exports = router;
