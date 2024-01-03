const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Welcome to Restaurant API!'
        }
    );
});

router.post('/', restaurantController.createRestaurant);
router.patch('/', restaurantController.modifyRestaurant);
router.delete('/', restaurantController.deleteRestaurant);


module.exports = router;