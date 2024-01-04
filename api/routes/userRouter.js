const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.loginUser);
router.post('/signup', userController.createUser);
router.patch('/', userController.modifyUser);
router.delete('/', userController.deleteUser);


module.exports = router;