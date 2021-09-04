const router = require('express').Router();

const { authController } = require('../controllers');
const userMiddleware = require('../middleWares/user.middleware');

router.post(
    '/',
    userMiddleware.getUserbyDynamicParam('email'),
    authController.loginUser
);

module.exports = router;
