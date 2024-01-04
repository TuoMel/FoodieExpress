const User = require('../../models/User');
const bcrypt = require('bcrypt');

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email }).exec();

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

const createUser = async (first_name, last_name, email, password, phone) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            first_name,
            last_name,
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
            throw new Error("Error creating a new restaurant!");
        }
    }
}

const modifyUser = async () => {

}

const deleteUser = async () => {

}


module.exports = {
    loginUser,
    createUser,
    modifyUser,
    deleteUser
}