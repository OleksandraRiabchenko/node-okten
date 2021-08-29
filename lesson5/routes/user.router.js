const router = require('express').Router();

const { userController } = require('../controllers');
const { checkUniqueEmail, isUserPresent, validateUserBody } = require('../middleWares/user.middleware');

router.post('/', validateUserBody, checkUniqueEmail, userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);

module.exports = router;
