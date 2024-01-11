const User = require('../../models/User');
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return { success: false, message: 'Incorrect password!' };
        }

        return { success: true, message: 'User logged in successfully!' };
    } catch (error) {
        throw new Error('Error logging in user!');
    }
}

const register = async (firstName, lastName, email, password, phone) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        });

        if (!newUser) {
            return { success: false, message: 'Error creating user!' };
        }

        return { success: true, message: 'User created successfully!' };
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            return { success: false, message: "User with this email already exists!" };
        } else {
            throw new Error("Error registering a new user!");
        }
    }
}

const updatePassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!oldPasswordMatch) {
            return { success: false, message: 'Old password is incorrect!' };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        await user.save();

        return { success: true, message: 'Password updated successfully!' };
    } catch (error) {
        throw new Error('Error updating user password!');
    }
}


module.exports = {
    login,
    register,
    updatePassword
}