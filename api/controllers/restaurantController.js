const restaurantService = require('../services/restaurantService');

const createRestaurant = async (req, res) => {
    res.send('Create Restaurant');
}

const modifyRestaurant = async (req, res) => {
    res.send('Modify Restaurant');
}

const deleteRestaurant = async (req, res) => {
    res.send('Delete Restaurant');
}


module.exports = {
    createRestaurant,
    modifyRestaurant,
    deleteRestaurant
}