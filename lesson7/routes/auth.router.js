const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middleWares');

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

module.exports = router;
