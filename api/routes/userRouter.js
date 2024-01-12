const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { Authentication } = require("../../middleware/JWTAuthentication");

router.delete('/:id', userController.deleteUser);

router.get('/:id/orders', userController.getOrdersForUser);
router.get('/:id/profile', Authentication, userController.getProfile);
router.put('/:id/profile', userController.updateProfile);


module.exports = router;