const Restaurant = require('../../models/Restaurant');

const getAllRestaurants = async () => {
    try {
        const restaurants = await Restaurant.find({});

        return { success: true, data: restaurants };
    } catch (error) {
        throw new Error("Error fetching restaurants!");
    }
}

const createRestaurant = async (name, address, coordinates, phone, email, website, description, hours) => {
    try {
        const newRestaurant = await Restaurant.create({
            name,
            address,
            coordinates,
            phone,
            email,
            website,
            description,
            ...(hours != null && { hours })
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

const modifyRestaurant = async () => {

}

const deleteRestaurant = async () => {

}


module.exports = {
    getAllRestaurants,
    createRestaurant,
    modifyRestaurant,
    deleteRestaurant
}