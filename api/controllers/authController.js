const authService = require('../services/authService');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await authService.login(email, password);

        if (!result.success) {
            return res.status(404).json({ message: "User not found or incorrect password!" });
        }

        return res.status(200).json({ message: 'User logged in successfully' });
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
            return res.status(409).json({ message: result.message });
        }

        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


module.exports = {
    login,
    register
}