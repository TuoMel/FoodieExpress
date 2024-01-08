const userService = require('../services/userService');


const getOrdersForUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await userService.getOrdersForUser(userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: "Orders fetched successfully!", data: result.data });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const getProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await userService.getProfile(userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: "Profile fetched successfully!", data: result.data });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const updateProfile = async (req, res) => {
    const usedId = req.params.id;

    const { firstName, lastName, email, phone } = req.body;

    if (!usedId || !firstName || !lastName || !email || !phone) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await userService.updateProfile(usedId, firstName, lastName, email, phone);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await userService.deleteUser(userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


module.exports = {
    getOrdersForUser,
    getProfile,
    updateProfile,
    deleteUser
}