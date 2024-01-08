const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;