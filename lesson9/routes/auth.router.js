const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middleWares');
const { actionTokenEnum } = require('../config');

router.post(
    '/',
    userMiddleware.getUserbyDynamicParam('email'),
    userMiddleware.throwIfUserNotPresent,
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateAccessToken,
    authController.logoutUser
);

router.post(
    '/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh
);

router.post(
    '/password/forgot/send',
    userMiddleware.getUserbyDynamicParam('email'),
    userMiddleware.throwIfUserNotPresent,
    authController.sendEmailForgotPass
);

router.post(
    '/password/forgot/set',
    userMiddleware.validateNewPassword,
    authMiddleware.validateActionToken(actionTokenEnum.FORGOT_PASS),
    authController.setNewForgotPassword
);

module.exports = router;
