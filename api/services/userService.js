const Order = require('../../models/Order');
const User = require('../../models/User');


const getOrdersForUser = async (userId) => {
    try {
        const orders = await Order.find({ user: userId }, { $limit: 50 }, { $sort: { createdAt: -1 } });

        if (!orders) {
            return { success: false, message: 'No orders found for this user!' };
        }

        return { success: true, data: orders };
    } catch (error) {
        throw new Error("Error getting orders for user!");
    }
}

const getProfile = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'No user found!' };
        }

        return { success: true, data: user };
    } catch (error) {
        throw new Error("Error getting user!");
    }
}

const updateProfile = async (userId, firstName, lastName, email, phone) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'No user found!' };
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await user.save();

        return { success: true, data: user };
    } catch (error) {
        throw new Error("Error updating user!");
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return { success: false, message: 'User not found or deleted!' };
        }

        return { success: true, message: 'User deleted!' };
    } catch (error) {
        throw new Error("Error deleting user!");
    }
}


module.exports = {
    getOrdersForUser,
    getProfile,
    updateProfile,
    deleteUser
}