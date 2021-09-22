const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');
const {
    paramName,
    userConstants: { REFRESH_TOKEN_TYPE },
    actionTokenEnum,
    validatorsName
} = require('../config');

router.post(
    '/',
    authMiddleware.validateLoginUser,
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    authMiddleware.throwIfUserNotPresent,
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateToken(),
    authController.logout
);

router.post(
    '/refresh',
    authMiddleware.validateToken(REFRESH_TOKEN_TYPE),
    authController.refresh
);

router.post(
    '/password/forgot/send',
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    authMiddleware.throwIfUserNotPresent,
    authController.sendEmailForgotPassword
);

router.post(
    '/password/forgot/set',
    userMiddleware.validateUserDinamic(validatorsName.user.passwordValiator),
    authMiddleware.validateActionToken(actionTokenEnum.FORGOT_PASS),
    authController.setNewForgotPassword
);

module.exports = router;
