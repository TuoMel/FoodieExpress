const restaurantService = require('../services/restaurantService');

const getAllRestaurants = async (req, res) => {
    try {
        const result = await restaurantService.getAllRestaurants();

        if (!result) {
            res.status(500).json({ message: 'Restaurants could not be fetched' });
        }

        res.status(200).json({ message: 'Restaurants fetched successfully', data: result.data });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const createRestaurant = async (req, res) => {
    const { name, address, coordinates, phone, email, website, description, hours } = req.body;

    if (!name || !address || !coordinates || !phone || !email || !website || !description) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.createRestaurant(name, address, coordinates, phone, email, website, description, hours);

        if (!result.success) {
            return res.status(409).json({ message: result.message });
        }

        return res.status(201).json({ message: 'Restaurant created successfully' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const modifyRestaurant = async (req, res) => {
    res.send('Modify Restaurant');
}

const deleteRestaurant = async (req, res) => {
    res.send('Delete Restaurant');
}


module.exports = {
    getAllRestaurants,
    createRestaurant,
    modifyRestaurant,
    deleteRestaurant
}