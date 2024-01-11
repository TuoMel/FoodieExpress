const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');


router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.createRestaurant);

router.get('/:id', restaurantController.getRestaurant);
router.patch('/:id/update', restaurantController.modifyRestaurantInfo);
router.patch('/:id/update/hours', restaurantController.modifyRestaurantHours);
router.delete('/:id/update', restaurantController.deleteRestaurant);

router.get('/:id/menu', restaurantController.getMenu);
router.post('/:id/menu', restaurantController.createMenuItem);
router.patch('/:id/menu/:itemId/', restaurantController.updateMenuItem);
router.delete('/:id/menu/:itemId/', restaurantController.deleteMenuItem);

module.exports = router;