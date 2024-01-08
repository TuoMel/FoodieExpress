const Restaurant = require('../../models/Restaurant');

const getAllRestaurants = async () => {
    try {
        const restaurants = await Restaurant.find({});

        if (!restaurants) {
            return { success: false, message: "No restaurants found!" };
        }

        return { success: true, data: restaurants };
    } catch (error) {
        throw new Error("Error fetching restaurants!");
    }
}

const getRestaurant = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found!" };
        }

        return { success: true, data: restaurant };
    } catch (error) {
        throw new Error("Error fetching the restaurant!");
    }
}

const createRestaurant = async (name, description, address, coordinates, phone, email, website, hours) => {
    try {
        const newRestaurant = await Restaurant.create({
            name,
            description,
            ...(address && { address }),
            ...(coordinates && { coordinates }),
            ...(phone && { phone }),
            ...(email && { email }),
            ...(website && { website }),
            ...(hours && { hours }),
        });

        if (!newRestaurant) {
            return { success: false, message: "Error creating a new restaurant!" };
        }

        return { success: true, data: newRestaurant}
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return {success: false, message: "Restaurant with this name already exists!"};
        } else {
            throw new Error("Error creating a new restaurant!");
        }
    }
}

const modifyRestaurantInfo = async (restaurantId, description, address, coordinates, phone, email, website) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found!" };
        }

        restaurant.description = description || restaurant.description;
        restaurant.address = address || restaurant.address;
        restaurant.coordinates = coordinates || restaurant.coordinates;
        restaurant.phone = phone || restaurant.phone;
        restaurant.email = email || restaurant.email;
        restaurant.website = website || restaurant.website;

        await restaurant.save();

        return { success: true, data: restaurant };
    } catch (error) {
        throw new Error("Error updating the restaurant info!");
    }
}

const modifyRestaurantHours = async (restaurantId, hours) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found!" };
        }

        restaurant.hours = hours;

        await restaurant.save();

        return { success: true, data: restaurant };
    } catch (error) {
        throw new Error("Error updating the restaurant hours!");
    }
}

const deleteRestaurant = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found!" };
        }

        return { success: true, data: restaurant };
    } catch (error) {
        throw new Error("Error deleting the restaurant!");
    }
}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    modifyRestaurantInfo,
    modifyRestaurantHours,
    deleteRestaurant
}