const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');


router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.createRestaurant);

router.get('/:id', restaurantController.getRestaurant);
router.patch('/:id/update', restaurantController.modifyRestaurantInfo);
router.patch('/:id/update/hours', restaurantController.modifyRestaurantHours);
router.delete('/:id/update', restaurantController.deleteRestaurant);


module.exports = router;