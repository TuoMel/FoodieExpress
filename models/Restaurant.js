const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    address: Object,
    coordinates: Array,
    phone: String,
    email: String,
    website: String,
    rating: Number,
    hours: Object,
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

const setDefaultDeleteFilter = function(next) {
    this.isDeleted = true;
    this.save();
    next();
};

// Middlewares
restaurantSchema.pre(['find', 'findOne', 'findOneAndReplace', 'findOneAndUpdate'], setDefaultSearchFilter);

restaurantSchema.pre(['deleteOne', 'findOneAndDelete'], setDefaultDeleteFilter);

restaurantSchema.pre('deleteMany', function(next) {
    next(new Error('Deletion prevented for deleteMany.'));
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;