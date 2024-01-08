const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
        },
    email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const setDefaultSearchFilter = function(next) {
    this.where({ isDeleted: false });
    next();
};

const setDefaultDeleteFilter = async function(next) {
    console.log("HERE IN MIDDLEWARE 1!")
    this.isDeleted = true;
    await this.save();
    console.log("HERE IN MIDDLEWARE 2!")
    next(new Error('Deletion prevented. Document marked as deleted.'));
};

// Middlewares
userSchema.pre(['find', 'findOne', 'findOneAndReplace', 'findOneAndUpdate'], setDefaultSearchFilter);

userSchema.pre(['deleteOne', 'findOneAndDelete'], { document: true, query: false }, setDefaultDeleteFilter);

userSchema.pre('deleteMany', function(next) {
    next(new Error('Deletion prevented for deleteMany.'));
});

const User = mongoose.model('User', userSchema);

module.exports = User;