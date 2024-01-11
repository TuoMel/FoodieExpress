const Restaurant = require('../../models/Restaurant');
const MenuItem = require('../../models/MenuItem');

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
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found or deleted!" };
        }

        restaurant.isDeleted = true;

        await restaurant.save();

        return { success: true, message: 'Restaurant deleted!' };
    } catch (error) {
        throw new Error("Error deleting the restaurant!");
    }
}

const getMenu = async (restaurantId) => {
    try {
        console.log("HERE!")
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found!" };
        }

        const menu = await MenuItem.find({ _id: { $in: restaurant.menuItems } }, { name: 1, description: 1, price: 1 });

        if (!menu || menu.length === 0) {
            return { success: false, message: "No menu found!" };
        }

        return { success: true, data: menu };
    } catch (error) {
        throw new Error("Error fetching the menu!");
    }
}

const createMenuItem = async (restaurantId, name, description, price) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found or deleted!" };
        }

        const newMenuItem = await MenuItem.create({
            restaurant: restaurantId,
            name,
            description,
            price
        });

        if (!newMenuItem) {
            return { success: false, message: "Error creating a new menu item!" };
        }

        const linkMenuItem = restaurant.menuItems.push(newMenuItem._id);

        await restaurant.save();

        if (!linkMenuItem) {
            return { success: false, message: "Error linking the menu item to the restaurant!" };
        }

        return { success: true, data: newMenuItem}
    } catch (error) {
        throw new Error('Error creating a new menu item!');
    }
}

const updateMenuItem = async (restaurantId, menuItemId, name, description, price) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return { success: false, message: "Restaurant not found or deleted!" };
        }

        const menuItem = MenuItem.findById(itemId);

        if (!menuItem) {
            return { success: false, message: "Menu item not found or deleted!" };
        }

        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;

        await menuItem.save();

        return { success: true, data: menuItem };
    } catch (error) {
        throw new Error('Error updating the menu item!');
    }
}

const deleteMenuItem = async (itemId) => {
    try {
        const item = await MenuItem.findById(itemId);

        if (!item) {
            return { success: false, message: "Menu item not found or deleted!" };
        }

        item.isDeleted = true;

        await item.save();

        const unlinkMenuItem = await Restaurant.updateOne(
            { _id: item.restaurant },
            { $pull: { menuItems: itemId } }
        );

        if (!unlinkMenuItem) {
            return { success: false, message: "Error unlinking the menu item from the restaurant!" };
        }

        return { success: true, message: 'Menu item deleted!' };
    } catch (error) {
        throw new Error("Error deleting the menu item!");
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