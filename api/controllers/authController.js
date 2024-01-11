const authService = require('../services/authService');


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await authService.login(email, password);

        if (!result.success) {
            return res.status(401).json({ message: "Invalid username or password!" });
        }

        return res.status(200).json({ message: 'User logged in successfully!' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const register = async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;

    if (!first_name || !last_name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await authService.register(first_name, last_name, email, password, phone);

        if (!result.success) {
            return res.status(409).json({ message: 'Error creating a new user!' });
        }

        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const updatePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await authService.updatePassword(userId, oldPassword, newPassword);

        if (!result.success && result.message === 'User not found!') {
            return res.status(404).json({ message: result.message });
        }

        if (!result.success && result.message === 'Old password is incorrect!') {
            return res.status(401).json({ message: result.message });
        }

        if (!result.success) {
            return res.status(409).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


module.exports = {
    login,
    register,
    updatePassword
}