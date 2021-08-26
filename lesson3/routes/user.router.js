const router = require('express').Router();

const {userController} = require('../controllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:user_id', userController.getSingleUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;