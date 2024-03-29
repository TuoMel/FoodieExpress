const restaurantService = require('../services/restaurantService');

const getAllRestaurants = async (req, res) => {
    try {
        const result = await restaurantService.getAllRestaurants();

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        res.status(200).json({ message: 'Restaurants fetched successfully!', data: result.data });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const getRestaurant = async (req, res) => {
    const restaurantId = req.params.id;

    if (!restaurantId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.getRestaurant(restaurantId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Restaurant fetched successfully!', data: result.data });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const createRestaurant = async (req, res) => {
    const { name, description, address, coordinates, phone, email, website, hours } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.createRestaurant(name, description, address, coordinates, phone, email, website, hours);

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

const modifyRestaurantInfo = async (req, res) => {
    const restaurantId = req.params.id;

    const { description, address, coordinates, phone, email, website } = req.body;

    if (!restaurantId || !description && !address && !coordinates && !phone && !email && !website) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.modifyRestaurantInfo(restaurantId, description, address, coordinates, phone, email, website);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Restaurant info modified successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const modifyRestaurantHours = async (req, res) => {
    const restaurantId = req.params.id;
    const hours = req.body.hours;

    if (!restaurantId || !hours) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.modifyRestaurantHours(restaurantId, hours);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Restaurant hours modified successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id;

    if (!restaurantId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.deleteRestaurant(restaurantId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Restaurant deleted successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const getMenu = async (req, res) => {
    const restaurantId = req.params.id;

    if (!restaurantId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.getMenu(restaurantId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Menu fetched successfully!', data: result.data });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const createMenuItem = async (req, res) => {
    const restaurantId = req.params.id;
    const { name, description, price } = req.body;

    if (!restaurantId || !name || !description || !price) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.createMenuItem(restaurantId, name, description, price);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(201).json({ message: 'New menu item created successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const updateMenuItem = async (req, res) => {
    const restaurantId = req.params.id;
    const menuItemId = req.params.itemId;
    const { name, description, price } = req.body;

    if (!restaurantId || !menuItemId || !name || !description || !price) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.updateMenuItem(restaurantId, menuItemId, name, description, price)

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(201).json({ message: 'Menu item updated successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const deleteMenuItem = async (req, res) => {
    const menuItemId = req.params.itemId;

    if (!menuItemId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await restaurantService.deleteMenuItem(menuItemId)

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(201).json({ message: 'Menu item deleted successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    modifyRestaurantInfo,
    modifyRestaurantHours,
    deleteRestaurant,
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
}