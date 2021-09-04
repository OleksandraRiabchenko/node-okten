const router = require('express').Router();

const { userController } = require('../controllers');
const {
    checkUniqueEmail,
    validateUserBody,
    checkUserRoleMdlwr, getUserbyDynamicParam
} = require('../middleWares/user.middleware');
const { ADMIN } = require('../config/user-roles.enum');

router.post(
    '/',
    validateUserBody,
    checkUniqueEmail,
    userController.createUser
);
router.get(
    '/',
    userController.getAllUser
);
router.get(
    '/:user_id',
    getUserbyDynamicParam('user_id', 'params', '_id'),
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    getUserbyDynamicParam('user_id', 'params', '_id'),
    checkUserRoleMdlwr([ADMIN]),
    userController.deleteUser
);

module.exports = router;
