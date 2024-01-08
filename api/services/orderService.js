const Order = require('../../models/Order');
const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');


const createOrder = async (userId, restaurantId, items, total) => {
    try {
        const orderCustomer = await User.findById(userId);

        if (!orderCustomer) {
            return {success: false, message: 'User does not exist or it is deleted!' };
        }

        const orderRestaurant = await Restaurant.findById(restaurantId);

        if (!orderRestaurant) {
            return {success: false, message: 'Restaurant does not exist or it is deleted!' };
        }

        const order = await Order.create({
            user: userId,
            restaurant: restaurantId,
            items,
            total
        });

        if (!order) {
            return {success: false, message: 'Error creating a new order!' };
        }

        return {success: true, data: order};
    } catch (error) {
        throw new Error("Error creating a new order!");
    }
}

const deleteOrder = async (orderId) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { isDeleted: true, status: 'canceled'
            },
            { new: true }
        );

        if (!order) {
            return { success: false, message: 'Order does not exist or it is already deleted!' };
        }

        return { success: true, data: order };
    } catch (error) {
        throw new Error("Error deleting an order!");
    }
}

const updateOrderStatus = async (orderId, userId, status) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return { success: false, message: 'Order does not exist or it is deleted!' };
        }

        order.status = status;

        await order.save();

        return { success: true, data: order };
    } catch (error) {
        throw new Error("Error updating order status!");
    }
}


module.exports = {
    createOrder,
    deleteOrder,
    updateOrderStatus
}