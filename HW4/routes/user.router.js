const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddelware } = require('../middleWares');

router.post('/', userMiddelware.checkUniqueEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userMiddelware.isUserPresent, userController.getSingleUser);
router.delete('/:user_id', userMiddelware.isUserPresent, userController.deleteUser);
router.put('/:user_id', userMiddelware.isUserPresent, userMiddelware.checkUniqueEmail, userController.updateUser);

module.exports = router;
